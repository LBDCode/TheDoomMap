using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DoomMap.Entities
{
    public class Gage
    {

        public string state_abv { get; set; }

        public string agency_cd { get; set; }

        public string site_no { get; set; }

        public string station_nm { get; set; }

        public double datum { get; set; }

        public Geometry location_geom { get; set; }

        public Boolean active { get; set; }

        public string datum_type { get; set; }

        public Decimal latitude { get; set; }

        public Decimal longitude { get; set; }

        [Key]
        public int oid { get; set; }


    }
}
