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


        //[HttpGet("{gid}", Name = "GetByAdvisoryAreaID")]
        //public IActionResult Get(int gid)
        //{
        //    var area = _context.Find<AdvisoryArea>(gid);
        //    return Ok(area);
        //}
    }
}
