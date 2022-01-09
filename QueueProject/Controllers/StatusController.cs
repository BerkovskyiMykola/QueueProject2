using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QueueProject.Models;

namespace QueueProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public StatusController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        [Authorize(Roles = "PlaceOwner")]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }
    }
}
