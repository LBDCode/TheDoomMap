using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class StormPts
    {

        [Key]
        public int gid { get; set; }

        public string? advdate { get; set; }

        public string? advisnum { get; set; }

        public string? datelbl { get; set; }

        public string? stormname { get; set; }

        public string? stormtype { get; set; }
        
        public string? tcdvlp { get; set; }

        public Geometry geom { get; set; }

    }
}
