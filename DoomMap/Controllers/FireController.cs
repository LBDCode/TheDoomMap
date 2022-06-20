using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using DoomMap.Entities;
using Microsoft.EntityFrameworkCore;
using DoomMap.Services;

namespace DoomMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FiresController : ControllerBase
    {

        private readonly DoomContext _context;

        private readonly IFireService _fireService;

        private readonly ILogger<FiresController> _logger;


        public FiresController(IFireService fireService, ILogger<FiresController> logger)
        {
            _fireService = fireService;
            _logger = logger;
        }


        [HttpGet]
        public IActionResult Get()
        {
            List<Fire> fires = new List<Fire>();
            fires = (from FireList in _context.Fires select FireList).ToList();
            return Ok(fires);
        }

        [HttpGet("{objectid}", Name = "GetByFireID")]
        public async Task<ActionResult<Fire>> GetFireByID(string objectid)
        {
            var fire = await _fireService.GetFireByID(objectid);

            if (fire is null)
            {
                return NotFound();
            }

            return Ok(fire);
        }

        [HttpPost]
        [Route("viewfires")]
        public async Task<ActionResult> Post([FromBody] MapView viewBounds)
        {

            var fires = await _fireService.GetFiresInView(viewBounds);

            return Ok(fires);
        }


    }
}
