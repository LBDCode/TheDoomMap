using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoomMap.Entities;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost]
        [Route("viewstorms")]
        public IActionResult Post([FromBody] MapView viewBounds)
        {
            string tableName = "storm_track_pgn";

            string viewXMin = viewBounds.xmin.ToString();
            string viewYMin = viewBounds.ymin.ToString();
            string viewXMax = viewBounds.xmax.ToString();
            string viewYMax = viewBounds.ymax.ToString();

            string stormSelect = $"SELECT * FROM {tableName} WHERE geom";
            string makeEnvelope = $" && ST_MakeEnvelope({viewXMin}, {viewYMin}, {viewXMax}, {viewYMax}, 4326)";

            string fullSqlQuery = stormSelect + makeEnvelope;

            List<StormPgn> fires = _context.StormPgn.FromSqlRaw(fullSqlQuery).ToList();
            return Ok(fires);
        }


    }
}
