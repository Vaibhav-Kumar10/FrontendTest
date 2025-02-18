import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTimes = ["10:00 AM", "10:35 AM", "01:45 PM", "03:45 PM"];

const Reminder = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [customTime, setCustomTime] = useState("");
  const [remindMe, setRemindMe] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  const addCustomTime = () => {
    if (customTime) {
      const formattedTime = convertTo12HourFormat(customTime);
      if (!selectedTimes.includes(formattedTime)) {
        setSelectedTimes([...selectedTimes, formattedTime]);
      }
      setCustomTime("");
    }
  };

  const submitReminder = async () => {
    try {
      // await axios.post("http://localhost:5000/set-reminder", {
      await axios.post("https://backend-hyv7.onrender.com", {
        remindMe,
        times: selectedTimes,
      });
      alert("Reminder set successfully!");
    } catch (error) {
      console.error("Error setting reminder", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Back Button */}
        <button
          className="text-lg font-semibold text-gray-600 mb-4"
          onClick={() => navigate("/dashboard")} // Navigates back to Dashboard
        >
          &larr; Reminder
        </button>

        <div className="flex flex-col items-center mt-4">
          <img
            src="https://smartrespiratory.com/wp-content/uploads/2020/05/7_1500x1500-768x768.jpg"
            alt="Inhaler"
            className="w-24 h-24"
          />

          <h2 className="text-xl font-bold mt-2">Inhaler</h2>
          <p className="text-gray-500">Ongoing Medication • 3 puffs</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-lg font-semibold text-gray-700">Remind Me</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={remindMe}
              onChange={() => setRemindMe(!remindMe)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-purple-600">Schedule</h3>
        <div className="mt-2 space-y-3">
          {defaultTimes.map((time) => (
            <button
              key={time}
              onClick={() => toggleTimeSelection(time)}
              className={`w-full py-3 rounded-lg text-lg border-2 transition-all ${
                selectedTimes.includes(time)
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-lg"
          />
          <button
            onClick={addCustomTime}
            className="py-2 px-4 bg-purple-600 text-white rounded-lg text-lg"
          >
            Add
          </button>
        </div>

        <button
          onClick={submitReminder}
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg text-lg shadow-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Reminder;
