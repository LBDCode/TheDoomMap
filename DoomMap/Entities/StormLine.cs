using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class StormLine
    {

        [Key]
        public int gid { get; set; }

        public string? stormname { get; set; }

        public string? stormtype { get; set; }

        public string? advdate { get; set; }

        public string? advisnum { get; set; }


        public Geometry geom { get; set; }


    }
}
