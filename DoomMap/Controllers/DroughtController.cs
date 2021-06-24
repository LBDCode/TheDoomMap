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
    public class DroughtController : ControllerBase
    {

        private readonly DoomContext _context;
        public DroughtController(DoomContext context)
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
            List<Drought> droughts = new List<Drought>();
            droughts = (from DroughtList in _context.Droughts select DroughtList).ToList();
            return Ok(droughts);
        }


    }
}
