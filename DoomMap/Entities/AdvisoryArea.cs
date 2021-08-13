using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class AdvisoryArea
    {

        [Key]
        public int gid { get; set; }

        public string issuance { get; set; }

        public string expiration { get; set; }

        public string onset { get; set; }

        public string ends { get; set; }

        public string prod_type { get; set; }

        public Geometry geom { get; set; }


    }
}
