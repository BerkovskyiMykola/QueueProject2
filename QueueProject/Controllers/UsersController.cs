using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Models.Request;
using QueueProject.Services.Authorization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UsersController(ApplicationContext context, IJwtService jwtService, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .SingleOrDefaultAsync(x => x.Id.ToString() == HttpContext.User.Identity!.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Firstname,
                user.Lastname,
                user.Email,
                Role = user.Role!.Name
            });
        }

        [HttpPut("edit/profile")]
        [Authorize]
        public async Task<IActionResult> PutUserProfile(ProfileRequest profile)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id.ToString() == HttpContext.User.Identity!.Name);

            if (user == null)
            {
                return BadRequest();
            }

            user.Lastname = profile.Lastname;
            user.Firstname = profile.Firstname;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _context.Users
                .Include(x => x.Role)
                .Where(x => x.Id.ToString() != HttpContext.User.Identity!.Name)
                .Select(x => new { x.Id, x.Firstname, x.Lastname, x.Email, RoleId = x.Role!.Id, Role = x.Role.Name })
                .ToListAsync());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostUser(User model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }

            model.Password = _passwordHasher.HashPassword(model, model.Password);

            await _context.Users.AddAsync(model);
            await _context.SaveChangesAsync();

            var role = await _context.Roles.FindAsync(model.RoleId);

            return Ok(new { model.Id, model.Firstname, model.Lastname, model.Email, RoleId = role!.Id, Role = role.Name });
        }

        [HttpPut("edit/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutUser(Guid id, EditUserRequest model)
        {
            if (id != model.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(model.UserId);

            if (user == null)
            {
                return NotFound();
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;
            user.RoleId = model.RoleId;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.Include(x => x.QueuePeople).SingleOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            _context.QueuePeople.RemoveRange(user.QueuePeople);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
