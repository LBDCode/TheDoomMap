using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoomMap.Entities;

namespace DoomMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StormController : ControllerBase
    {

        private readonly DoomContext _context;
        public StormController(DoomContext context)
        {
            _context = context;
        }

        //private readonly ILogger<GagesController> _logger;

        //public GagesController(ILogger<GagesController> logger)
        //{
        //    _logger = logger;
        //}

        [HttpGet]
        public IActionResult Get()
        {
            List<Storm> storms = new List<Storm>();
            storms = (from StormList in _context.Storms select StormList).ToList();
            return Ok(storms);
        }


    }
}
