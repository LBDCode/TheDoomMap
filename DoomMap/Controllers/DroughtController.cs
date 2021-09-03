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
    public class DroughtController : ControllerBase
    {

        private readonly DoomContext _context;
        public DroughtController(DoomContext context)
        {
            _context = context;
        }



        [HttpGet]
        public IActionResult Get()
        {
            List<Drought> droughts = new List<Drought>();
            droughts = (from DroughtList in _context.Droughts select DroughtList).ToList();
            return Ok(droughts);
        }


        [HttpPost]
        [Route("viewdroughts")]
        public IActionResult Post([FromBody] MapView viewBounds)
        {
            string tableName = "drought_conditions";

            string viewXMin = viewBounds.xmin.ToString();
            string viewYMin = viewBounds.ymin.ToString();
            string viewXMax = viewBounds.xmax.ToString();
            string viewYMax = viewBounds.ymax.ToString();


            string droughtSelect = $"SELECT * FROM {tableName} WHERE ST_Intersects(geom,";
            string makeST_Geom = $" ST_GeomFromText('Polygon ((";
            string ST_GeomCoords = $"{viewXMin} {viewYMin}, {viewXMin} {viewYMax}, {viewXMax} {viewYMax}, {viewXMax} {viewYMin}, {viewXMin} {viewYMin}))'";
            string SRIDConstraint = $",4326))";

            string fullSqlQuery = droughtSelect + makeST_Geom + ST_GeomCoords + SRIDConstraint;

            List<Drought> droughts = _context.Droughts.FromSqlRaw(fullSqlQuery).ToList();
            return Ok(droughts);
        }


    }
}
