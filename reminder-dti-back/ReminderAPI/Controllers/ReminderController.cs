using Microsoft.AspNetCore.Mvc;
using ReminderAPI.Entities;
using ReminderAPI.Data;
using Microsoft.EntityFrameworkCore;
using ReminderAPI.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReminderAPI.Controllers
{
    [ApiController]
    [Route("reminders")]
    public class RemindersController : ControllerBase
    {
        private readonly DataContext _context;

        public RemindersController(DataContext context)
        {
            _context = context;
        }

        // makes a get request to the database and return the list of reminders with a 200 OK HTTP status code
        [HttpGet]
        public async Task<ActionResult> GetAllReminders()
        {
            var reminders = await _context.Reminders.ToListAsync();
            return Ok(reminders);
        }

        // a post request is made via the /new route and adds a new reminder to the database based on the data provided and returns the updated list of reminders and a 200 OK HTTP status code.
        [HttpPost("/new")]
        public async Task<ActionResult> AddReminder(ReminderDTO reminder)
        {
            string tempDate = reminder.Date.ToString("yyyy-MM-dd");// converts the date of the received reminder to a string formatted in the format "yyyy-MM-dd"
            byte[] id = Guid.NewGuid().ToByteArray();// create a new globally unique identifier (GUID) and converts it to a byte array
            int tempId = BitConverter.ToInt32(id);// converts a byte array to a 32-bit integer

            reminder.Date = DateTime.Parse(tempDate);// updates the received reminder date to the converted formatted date
            Reminder sendReminder = new Reminder(tempId, reminder.Name, reminder.Date);// creates a new object with the data generated above
            _context.Reminders.Add(sendReminder); // adds the new reminder to the database context

            await _context.SaveChangesAsync(); // saves changes to the database asynchronously
            return Ok(await _context.Reminders.ToListAsync());
        }

        // makes a delete request for a reminder stored in the database, by its id. If the reminder with the specified ID is not found, returns a 404 Not Found HTTP status code
        [HttpDelete("/delete/{Id}")]
        public async Task<ActionResult<List<Reminder>>> DeleteReminder(int Id)
        {
            var dbReminder = await _context.Reminders.FindAsync(Id);
            if (dbReminder is null)
                return NotFound("Reminder is not found.");

            _context.Reminders.Remove(dbReminder);
            await _context.SaveChangesAsync();

            return Ok(await _context.Reminders.ToListAsync());
        }
    }
}
