import "./index.css";
import FormInput from "./components/FormInput.tsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createReminders, deleteReminder, getReminders } from "./axios/client.ts";
import { currentDayFormated, dateFormated } from "./utils/dateUtils.ts";

// creates a state variable and a setValues function that uses useState to fetch the values entered by the user and update the values variable
function App() {
  const [values, setValues] = useState({
    reminderName: "",
    reminderDate: "",
  });

  const [reminders, setReminders] = useState<any[]>([]);

  // two reminders form input objects
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Reminder",
      errorMessage: "Reminder should be written",
      label: "Reminder",
      pattern: "^(?!\s*$).+",
      required: true
    },
    {
      id: 2,
      name: "date",
      type: "date",
      min: currentDayFormated(),
      placeholder: "Reminder Date (on format dd/mm/yyyy)",
      errorMessage: "Reminder date should be written",
      label: "Reminder Date",
      pattern: "\d{4}-\d{2}-\d{2}",
      required: true
    }
  ]

  // asynchronous function that tries to fetch reminders from the api and updates on the web page
  async function updateReminders() {
    try {
      const initReminders = await getReminders();
      setReminders(initReminders);
    } catch (error) {
      console.error('Failed to fetch reminders:', error);
    }
  }

  // hook that triggers the updateReminders function. When the component is rendered, the function updates the reminders
  useEffect(() => {
    updateReminders();
  }, []);

  // searches for the data entered by the user in the reminder form and when sending it, creates a reminder with this data, sending it and updating it in the reminder list
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const reminderName = formData.get('name') as string;
    const reminderDate = formData.get('date') as string;
    const reminderData = { name: reminderName, date: reminderDate }

    try {
      await createReminders(reminderData);
      await updateReminders();
    } catch (error) {
      console.error('Failed to create reminder:', error);
    }
  };

  // event handler that changes the values state of the reminder name and date provided by user input
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setValues({ ...values, [e.target.data]: e.target.value })
  }

  // event handler that when triggered when clicking the x button, deletes the reminder based on the id and updates the list of reminders
  const handleDelete = async (reminderId: number) => {
    try {
      await deleteReminder(reminderId);
      await updateReminders();
    } catch (error) {
      console.error('Failed to delete reminder:', error);
    }
  };

  const [remindersByDate, setRemindersByDate] = useState<{ [key: string]: any[] }>({});

  // function that organizes reminders by date, grouping them into an object where the keys are the dates and the values are arrays of reminders corresponding to these dates.
  const organizeRemindersByDate = () => {
    const remindersByDate: { [key: string]: any[] } = {};

    reminders.map((reminder) => {
      if (!remindersByDate[reminder.date]) {
        remindersByDate[reminder.date] = [];
      }
      remindersByDate[reminder.date].push(reminder);
    });

    return remindersByDate;
  };

  // updates the remindersByData variable whenever the date is modified
  useEffect(() => {
    const remindersByDate = organizeRemindersByDate();
    setRemindersByDate(remindersByDate);
  }, [reminders]);


  return (
    <div className="app">
      <form className="form-rem" onSubmit={handleSubmit}>
        <h1>Reminder</h1>

        {/* renders a series of input components that wait for the user to fill out and submit the form  */}
        {inputs.map((input) => {
          return <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        }
        )}
        <button>Create</button>
      </form>
      <div className="reminder-list">
        <h2>Reminders List</h2>

        {/* renders the list of reminders grouped by date. Each reminder can be deleted by clicking the 'x' button, which triggers handleDelete */}
        {Object.keys(remindersByDate).sort().map((date) => (
          <div key={dateFormated(date)} className="reminder-group">
            <h2>{dateFormated(date)}
            </h2>
            {remindersByDate[date].map((reminder) => (
              <div key={reminder.id} className="reminder-item">
                <p>{reminder.name}</p>
                <button onClick={() => handleDelete(reminder.id)}>x</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App