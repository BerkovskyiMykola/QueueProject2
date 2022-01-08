using Microsoft.EntityFrameworkCore;
using QueueProject.Models;

namespace QueueProject
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Place> Places { get; set; } = null!;
        public DbSet<Status> Statuses { get; set; } = null!;
        public DbSet<QueuePerson> QueuePeople { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = Guid.NewGuid(), Name = "User" },
                new Role { Id = Guid.NewGuid(), Name = "PlaceOwner" },
                new Role { Id = Guid.NewGuid(), Name = "Admin" }
            );

            modelBuilder.Entity<Status>().HasData(
                new Status { Id = Guid.NewGuid(), Name = "In queue" },
                new Status { Id = Guid.NewGuid(), Name = "Use" }
            );
        }
    }
}
