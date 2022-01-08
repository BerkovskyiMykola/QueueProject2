using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public PlacesController(ApplicationContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpGet("placeOwner/all")]
        public async Task<IActionResult> GetOwnPlaces()
        {
            var places = await _context.Places.Where(x => x.UserId.ToString() == HttpContext.User.Identity!.Name).ToListAsync();
            return Ok(places.Select(x => new
            {
                x.Id,
                x.Name,
                x.Address,
                x.IsActive
            }));
        }

        [Authorize(Roles = "User")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAvailablePlaces()
        {
            var places = await _context.Places.Where(x => x.IsActive).ToListAsync();
            return Ok(places.Select(x => new
            {
                x.Id,
                x.Name,
                x.Address
            }));
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutPlace(Guid id, Place place)
        {
            if (id != place.Id)
            {
                return BadRequest();
            }

            if (!await _context.Places.AnyAsync(x => x.UserId.ToString() == HttpContext.User.Identity!.Name && x.Id == id))
            {
                return BadRequest();
            }

            _context.Entry(place).State = EntityState.Modified;
            _context.Entry(place).Property(x => x.UserId).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpPost("create")]
        public async Task<IActionResult> PostPlace(Place place)
        {
            place.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Id.ToString() == HttpContext.User.Identity!.Name);

            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                place.Id,
                place.Name,
                place.Address,
                place.IsActive
            });
        }

        [Authorize(Roles = "PlaceOwner")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePlace(Guid id)
        {
            var place = await _context.Places
                .SingleOrDefaultAsync(x => x.Id == id && x.UserId.ToString() == HttpContext.User.Identity!.Name);

            if (place == null)
            {
                return NotFound();
            }

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlaceExists(Guid id)
        {
            return _context.Places.Any(e => e.Id == id);
        }
    }
}
