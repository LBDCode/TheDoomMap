using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoomMap.Entities;
using Microsoft.EntityFrameworkCore;

namespace DoomMap.Services
{
    public interface IFireService
    {
        Task<Fire> GetFireByID(string objectid);

        Task<List<Fire>> GetFiresInView(MapView viewBounds);
    }
}
