using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;
using QueueProject.Services.Mail;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueuePersonsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMailService _mailService;

        public QueuePersonsController(ApplicationContext context, IMailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetQueuePeople(Guid id)
        {
            var place = await _context.Places
                .Include(x => x.QueuePeople)
                .ThenInclude(x => x.User)
                .Include(x => x.QueuePeople)
                .ThenInclude(x => x.Status)
                .SingleOrDefaultAsync(x => x.UserId.ToString() == HttpContext.User.Identity!.Name && x.Id == id);

            if(place == null)
            {
                return NotFound();
            }
            return Ok(new
            {
                Name = place.Name,
                Address = place.Address,
                QueuePeople = place.QueuePeople.OrderBy(x => x.Created).Select(x => new {
                    x.Id,
                    x.Created,
                    StatusId = x.Status!.Id,
                    Status = x.Status.Name,
                    Email = x.User!.Email,
                })
            });
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutQueuePerson(Guid id, QueuePerson model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            var queuePerson = await _context.QueuePeople
                .Include(x => x.User)
                .Include(x => x.Place)
                .SingleOrDefaultAsync(x => x.Id == model.Id && x.Place!.UserId.ToString() == HttpContext.User.Identity!.Name);

            if (queuePerson == null)
            {
                return NotFound();
            }

            var status = await _context.Statuses.FindAsync(model.StatusId);

            if (status == null)
            {
                return NotFound();
            }

            queuePerson.StatusId = model.StatusId;

            await _context.SaveChangesAsync();

            if (status.Name == "Use")
            {
                await _mailService.SendEmailAsync(queuePerson.User!.Email, "Черга", new() { TextBody = $"Ваша черга підійшла. Адреса: {queuePerson.Place!.Address}. Назва місця: {queuePerson.Place!.Name}" });
            }

            return NoContent();
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteQueuePerson(Guid id)
        {
            var queuePerson = await _context.QueuePeople
                .SingleOrDefaultAsync(x => x.Id == id && x.Place!.UserId.ToString() == HttpContext.User.Identity!.Name);

            if (queuePerson == null)
            {
                return NotFound();
            }

            _context.QueuePeople.Remove(queuePerson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<IActionResult> PostQueuePerson(QueuePerson queuePerson)
        {
            var place = await _context.Places.Include(x => x.QueuePeople).SingleOrDefaultAsync(x => x.Id == queuePerson.PlaceID);

            if(place == null)
            {
                return NoContent();
            }

            if(place.QueuePeople.Any(x => x.UserId.ToString() == HttpContext.User.Identity!.Name))
            {
                return BadRequest("Already in queue");
            }

            queuePerson.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Id.ToString() == HttpContext.User.Identity!.Name);

            queuePerson.Status = await _context.Statuses
                .SingleOrDefaultAsync(x => x.Name == "In queue");

            _context.QueuePeople.Add(queuePerson);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
