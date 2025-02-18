import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    mobile: "",
    medicalHistory: "",
    emergencyContacts: [{ name: "", phone: "" }],
  });

  // Handle input changes
  const handleChange = (e, index, field) => {
    if (index !== undefined) {
      const updatedContacts = [...formData.emergencyContacts];
      updatedContacts[index][field] = e.target.value;
      setFormData({ ...formData, emergencyContacts: updatedContacts });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add emergency contact
  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [
        ...formData.emergencyContacts,
        { name: "", phone: "" },
      ],
    });
  };

  // Submit form data to Flask backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://127.0.0.1:5000/save-profile", formData);
      const response = await axios.post(
        "https://backend-hyv7.onrender.com/save-profile",
        formData
      );

      if (response.data.user_id) {
        // ✅ Store user_id in local storage
        localStorage.setItem("user_id", response.data.user_id);

        // ✅ Show the user_id in an alert
        alert(
          `Profile saved successfully! Your User ID: ${response.data.user_id}`
        );

        // ✅ Redirect to the quiz page
        navigate("/quiz");
      } else {
        alert("Failed to save profile!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto h-[80vh] relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          <IoArrowBack className="text-2xl" />
        </button>

        <h2 className="text-xl font-semibold mb-2 text-center">
          Profile Management
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Help us to give you more accurate results.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-gray-700">
              Previous Medical History (if any)
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 h-24"
              placeholder="Enter medical history"
            ></textarea>
          </div>

          {/* Emergency Contacts */}
          <div>
            <label className="block text-gray-700">Emergency Contacts</label>
            {formData.emergencyContacts.map((contact, index) => (
              <div key={index} className="mt-2 p-2 border rounded">
                <input
                  type="text"
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) => handleChange(e, index, "name")}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contact.phone}
                  onChange={(e) => handleChange(e, index, "phone")}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addEmergencyContact}
              className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
            >
              + Add Contact
            </button>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
