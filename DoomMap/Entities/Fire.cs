using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class Fire
    {

        [Key]
        public int gid { get; set; }

        public Geometry geom { get; set; }

        public Decimal? dailyacres { get; set; }

        public DateTime? firediscov { get; set; }

        public string? incidentna { get; set; }

    }
}
