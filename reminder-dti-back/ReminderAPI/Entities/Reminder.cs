namespace ReminderAPI.Entities
{
    public class Reminder
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }

    // reminders startup constructor
    public Reminder(int Id, string name, DateTime date) {
        this.Id = Id;
        this.Name = name;
        this.Date = date;
    }
}

}
