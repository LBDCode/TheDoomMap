using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DoomMap.Entities;
using NetTopologySuite;

namespace DoomMap
{
	public class DoomContext : DbContext
	{
		public DoomContext(DbContextOptions options)
				: base(options)
		{
		}
        //protected override void OnConfiguring(DbContextOptionsBuilder builder)
        //{
        //    builder.UseNpgsql("Host=localhost;Database=DoomMap;Username=postgres;Password=postgresPWlbd",
        //        o => o.UseNetTopologySuite());
        //}


		public DbSet<Gage> Gages { get; set; }
        public DbSet<Fire> Fires { get; set; }
        public DbSet<AdvisoryArea> AdvisoryAreas { get; set; }
        public DbSet<Drought> Droughts { get; set; }
        public DbSet<Storm> Storms { get; set; }

        public DbSet<StormLine> StormLine { get; set; }

        public DbSet<StormPgn> StormPgn { get; set; }

        public DbSet<StormPts> StormPts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("postgis");
            modelBuilder.Entity<Gage>().ToTable("gages");
            modelBuilder.Entity<Fire>().ToTable("current_fires");
            modelBuilder.Entity<AdvisoryArea>().ToTable("advisory_areas");
            modelBuilder.Entity<Drought>().ToTable("drought_conditions");
            modelBuilder.Entity<Storm>().ToTable("storm_conditions");
            modelBuilder.Entity<StormLine>().ToTable("storm_track_lin");
            modelBuilder.Entity<StormPgn>().ToTable("storm_track_pgn");
            modelBuilder.Entity<StormPts>().ToTable("storm_track_pts");
        }

    }
}
