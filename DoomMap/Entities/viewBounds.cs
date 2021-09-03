using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class MapView
    {

        [Key]
        public Decimal xmin { get; set; }
        public Decimal xmax { get; set; }
        public Decimal ymin { get; set; }
        public Decimal ymax { get; set; }


    }
}
