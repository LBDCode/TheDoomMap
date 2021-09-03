using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using DoomMap.Entities;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult GetFire(string site_no)
        {
            var fire = _context.Find<Gage>(site_no);
            return Ok(fire);
        }

        [HttpPost]
        [Route("viewfires")]
        public IActionResult Post([FromBody] MapView viewBounds)
        {
            string tableName = "current_fires";

            string viewXMin = viewBounds.xmin.ToString();
            string viewYMin = viewBounds.ymin.ToString();
            string viewXMax = viewBounds.xmax.ToString();
            string viewYMax = viewBounds.ymax.ToString();

            string displayedAcres = "500";

            string fireSelect = $"SELECT * FROM {tableName} WHERE geom";
            string makeEnvelope = $" && ST_MakeEnvelope({viewXMin}, {viewYMin}, {viewXMax}, {viewYMax}, 4326)";
            string acreConstraint = $" AND dailyacres > {displayedAcres}";

            string fullSqlQuery = fireSelect + makeEnvelope + acreConstraint;

            List<Fire> fires = _context.Fires.FromSqlRaw(fullSqlQuery).ToList();
            return Ok(fires);
        }


    }
}
