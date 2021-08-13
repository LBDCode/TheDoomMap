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
        public int objectid { get; set; }

        public Geometry geom { get; set; }

        public Decimal? dailyacres { get; set; }

        public DateTime? firediscoverydatetime { get; set; }

        public string incidentname { get; set; }

        public string incidentshortdescription { get; set; }

    }
}
