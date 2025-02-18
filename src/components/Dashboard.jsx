import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { WiDayCloudy } from "react-icons/wi";
import { IoHome, IoNotifications, IoSettings } from "react-icons/io5";
import { MdOutlineAlarm } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState({
    temp: "28.3",
    humidity: "53.9",
    pollen: "low",
    aqi: "--",
  });
  const [inhalerData, setInhalerData] = useState({
    puffsLeft: "--",
    puffsToday: "--",
    lastPuffTime: "--",
  });
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]); // State to store alerts
  const [showModal, setShowModal] = useState(false); // Modal state
  const userId = localStorage.getItem("user_id"); // Retrieve user_id from local storage

  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        const data = response.data;
        setWeather({
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          pollen: "Low",
          aqi: data.current.air_quality.pm10,
        });
      })
      .catch((error) => console.error("Weather API Error: ", error));

    axios
      .get("")
      .then((response) => {
        setInhalerData(response.data);
        setDeviceConnected(response.data.connected);
      })
      .catch((error) => console.error("Inhaler API Error: ", error));
  }, []);

  // Function to call the AI Model API and fetch alerts
  const invokeAIModel = async () => {
    if (!userId) {
      alert("User ID not found! Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        // `http://127.0.0.1:5000/send-data-to-ai/${userId}`
        `https://backend-hyv7.onrender.com/send-data-to-ai/${userId}`
      );
      // Fetch alerts after AI processing
      const alertResponse = await axios.get(
        // `http://127.0.0.1:5000/get-alerts/${userId}`
        `https://backend-hyv7.onrender.com/get-alerts/${userId}`
      );

      const prediction = response.data.risk_score; // Extract predicted risk value

      // Determine risk level
      const riskLevel = prediction > 0.6 ? "High" : "Low";

      // Show alert based on risk level
      alert(`Predicted Risk: ${prediction.toFixed(2)} (${riskLevel} Risk)`);

      setAlerts(alertResponse.data.alerts);
      setShowModal(true); // Show alert modal
    } catch (error) {
      console.error("Error invoking AI model:", error);
      alert("Failed to invoke AI model!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-700">
          VIT Bhopal University
        </h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-gray-300 p-2 rounded-full"
        >
          👤
        </button>
      </div>

      {/* Weather Card */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">My Location</h2>
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">{weather.temp}°C</p>
          <div className="flex items-center gap-2">
            <WiDayCloudy className="text-3xl text-indigo-600" />
            <span className="text-sm text-gray-600">Partly Cloudy</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Humidity: {weather.humidity}% | AQI: {weather.aqi}
        </p>
      </div>

      {/* Connectivity Status */}
      <div
        className={`mt-2 text-sm font-semibold ${
          deviceConnected ? "text-green-600" : "text-red-500"
        }`}
      >
        Connectivity Status:{" "}
        {deviceConnected ? "Device Connected" : "Device Disconnected"}
      </div>

      {/* Inhaler Card */}
      <div className="bg-indigo-500 p-6 rounded-xl shadow-md mt-4 text-white">
        <h2 className="text-lg font-semibold">My Inhaler</h2>
        <p className="text-5xl font-bold">{inhalerData.puffsLeft}</p>
        <p className="text-sm">left of 200 puffs</p>
      </div>

      {/* AI Prediction Button */}
      <button
        onClick={invokeAIModel}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg shadow-md hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Predict with AI"}
      </button>

      {/* Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600">AI Alerts</h2>
            <ul className="mt-4">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 my-2 rounded-md text-gray-700"
                  >
                    <strong>
                      {new Date(alert.timestamp).toLocaleString()}
                    </strong>
                    <p>{alert.message}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No alerts available</p>
              )}
            </ul>
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex justify-around shadow-lg">
        <button onClick={() => navigate("/")}>
          <IoHome className="text-2xl text-gray-600" />
        </button>
        <button
        // onClick={() => navigate("/alerts")}
        >
          <IoNotifications className="text-2xl text-gray-600" />
        </button>
        <button
          onClick={() => navigate("/sos")}
          className="bg-red-500 p-4 rounded-full text-white font-bold"
        >
          SOS
        </button>
        <button onClick={() => navigate("/reminder")}>
          <MdOutlineAlarm className="text-2xl text-gray-600" />
        </button>
        <button
        // onClick={() => navigate("/settings")}
        >
          <IoSettings className="text-2xl text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
