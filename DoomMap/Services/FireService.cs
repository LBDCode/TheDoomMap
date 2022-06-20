using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoomMap.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoomMap.Services
{
    public class FireService : IFireService
    {
        private readonly DoomContext _context;
        public FireService(DoomContext context)
        {
            _context = context;
        }

        public async Task<Fire> GetFireByID(string objectid)
        {
            var fire = await _context.FindAsync<Fire>(objectid);

            return fire;
        }


        public async Task<List<Fire>> GetFiresInView(MapView viewBounds)
        {
            string tableName = "current_fires";

            string viewXMin = viewBounds.xmin.ToString();
            string viewYMin = viewBounds.ymin.ToString();
            string viewXMax = viewBounds.xmax.ToString();
            string viewYMax = viewBounds.ymax.ToString();

            string displayedAcres = "500";

            string fireSelect = $"SELECT * FROM {tableName} WHERE geom";
            string makeEnvelope = $" && ST_MakeEnvelope({viewXMin}, {viewYMin}, {viewXMax}, {viewYMax}, 4326)";
            string acreConstraint = $" AND dailyacres > {displayedAcres}";

            string fullSqlQuery = fireSelect + makeEnvelope + acreConstraint;

            List<Fire> fires = await _context.Fires.FromSqlRaw(fullSqlQuery).ToListAsync();
            return fires;

        }

    }
}
