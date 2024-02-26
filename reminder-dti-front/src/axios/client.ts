import axios from "axios";

const URL = "http://localhost:5227/"

//asynchronous function that goes to the url and make a get request to all the reminders present from the API and returns them, if it goes wrong, it returns an error
export const getReminders = async () => {
  const CLIENT = axios.create({ URL, })
  try {
    const response = await CLIENT.get(`${URL}reminders`)
    return response.data
  }
  catch (error) {
    throw new Error("Failed to get Reminders")
  }
}

// asynchronous function that receives the reminder date as a parameter in the app and sends a post to insert a reminder in the API when clicking the create button and returns the reminder
export const createReminders = async (data) => {
  const CLIENT = axios.create({ URL, })
  try {
    const response = await axios.post(`${URL}new`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create Reminder");
  }
};

// asynchronous function that receives the reminder id and deletes it
export const deleteReminder = async (reminderId: number) => {
  try {
    await axios.delete(`${URL}delete/${reminderId}`);
  } catch (error) {
    throw new Error("Failed to delete Reminder");
  }
}