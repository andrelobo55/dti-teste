using Microsoft.EntityFrameworkCore;
using ReminderAPI.Entities;

namespace ReminderAPI.Data
{
    // class that represents the database context for the application
    public class DataContext : DbContext
    {
        // defines a constructor for the DataContext class
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        public DbSet<Reminder> Reminders { get; set; } // DbSet to perform database operations such as query, insert, update, delete and ddefines a property that represents a collection of Reminder entities
    }  
}