using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class Storm
    {

        [Key]
        public int gid { get; set; }

        public Double? min_ft { get; set; }

        public Double? max_ft { get; set; }

        public Geometry geom { get; set; }


    }
}
