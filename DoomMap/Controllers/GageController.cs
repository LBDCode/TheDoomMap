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
    public class GagesController : ControllerBase
    {

        private readonly DoomContext _context;
        public GagesController(DoomContext context)
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
            List<Gage> gages = new List<Gage>();
            gages = (from GageList in _context.Gages select GageList).ToList();
            return Ok(gages);
        }

        [HttpGet("{site_no}", Name = "GetBySiteID")]
        public IActionResult Get(string site_no)
        {
            var gage = _context.Find<Gage>(site_no);
            return Ok(gage);
        }
    }
}
