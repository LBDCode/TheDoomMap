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
    public class StormTrackController : ControllerBase
    {

        private readonly DoomContext _context;
        public StormTrackController(DoomContext context)
        {
            _context = context;
        }

        //private readonly ILogger<GagesController> _logger;

        //public GagesController(ILogger<GagesController> logger)
        //{
        //    _logger = logger;
        //}

        [HttpGet("{type}", Name = "GetTrackByComponent")]
        public IActionResult Get(string type)
        {

            if (type == "line")
            {
                List<StormLine> areas = new List<StormLine>();

                areas = (from StormList in _context.StormLine select StormList).ToList();
                return Ok(areas);

            }
            else if (type == "pgn")
            {
                List<StormPgn> areas = new List<StormPgn>();

                areas = (from StormList in _context.StormPgn select StormList).ToList();
                return Ok(areas);

            }
            else if (type == "pts")
            {
                List<StormPts> areas = new List<StormPts>();

                areas = (from StormList in _context.StormPts select StormList).ToList();
                return Ok(areas);

            }
            else
            {
                return Ok();
            }

        }

    }
}
