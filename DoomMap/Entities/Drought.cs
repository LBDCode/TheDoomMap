using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class Drought
    {

        [Key]
        public int gid { get; set; }

        public int dm { get; set; }

        public Geometry geom { get; set; }



    }
}
