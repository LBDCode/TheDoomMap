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
    public class AdvisoryAreasController : ControllerBase
    {

        private readonly DoomContext _context;
        public AdvisoryAreasController(DoomContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<AdvisoryArea> areas = new List<AdvisoryArea>();

            areas = _context.AdvisoryAreas.Where(a => a.prod_type == "Red Flag Warning" || a.prod_type == "Heat Advisory" || a.prod_type == "Flood Warning").ToList();
            return Ok(areas);
        }


        [HttpGet("{type}", Name = "GetAreaByType")]
        public IActionResult Get(string type)
        {
            List<AdvisoryArea> areas = new List<AdvisoryArea>();

            if (type == "redflag")
            {
                areas = _context.AdvisoryAreas.Where(a => a.prod_type == "Red Flag Warning" ).ToList();
            }
            else if (type == "heatadvisory")
            {
                areas = _context.AdvisoryAreas.Where(a =>  a.prod_type == "Heat Advisory" ).ToList();

            } else if (type == "floodwatch")
            {
                areas = _context.AdvisoryAreas.Where(a => a.prod_type == "Flood Warning").ToList();

            }

            return Ok(areas);
        }


        [HttpPost]
        [Route("viewareas")]
        public IActionResult Post([FromBody] MapView viewBounds)
        {
            string tableName = "advisory_areas";

            string viewXMin = viewBounds.xmin.ToString();
            string viewYMin = viewBounds.ymin.ToString();
            string viewXMax = viewBounds.xmax.ToString();
            string viewYMax = viewBounds.ymax.ToString();


            string areaSelect = $"SELECT * FROM {tableName} WHERE ST_Intersects(geom,";
            string makeST_Geom = $" ST_GeomFromText('Polygon ((";
            string ST_GeomCoords = $"{viewXMin} {viewYMin}, {viewXMin} {viewYMax}, {viewXMax} {viewYMax}, {viewXMax} {viewYMin}, {viewXMin} {viewYMin}))'";
            string SRIDConstraint = $",4326))";

            string fullSqlQuery = areaSelect + makeST_Geom + ST_GeomCoords + SRIDConstraint;

            List<AdvisoryArea> areas = _context.AdvisoryAreas.FromSqlRaw(fullSqlQuery).ToList();
            return Ok(areas);
        }
    }
}
