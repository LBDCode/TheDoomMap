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
    public class FiresController : ControllerBase
    {

        private readonly DoomContext _context;
        public FiresController(DoomContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            List<Fire> fires = new List<Fire>();
            fires = (from FireList in _context.Fires select FireList).ToList();
            return Ok(fires);
        }

        [HttpGet("{site_no}", Name = "GetByFireID")]
        public IActionResult Get(string site_no)
        {
            var gage = _context.Find<Gage>(site_no);
            return Ok(gage);
        }
    }
}
