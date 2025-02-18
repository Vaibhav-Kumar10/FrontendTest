import React from "react";
import { BiUserVoice } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SOS = () => {
  const navigate = useNavigate();

  const handleCancelRequest = () => {
    navigate("/dashboard"); // Redirects to the dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-red-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <BiUserVoice className="w-16 h-16 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Responders are on the way
          </h2>

          <p className="text-gray-600 mb-8">
            Speak calmly to the person until the first aider arrives. First
            responders are on the way and the Rescue service is alarmed.
          </p>
        </div>

        <button
          className="w-full py-4 text-lg font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={handleCancelRequest}
        >
          Cancel request
        </button>
      </div>
    </div>
  );
};

export default SOS;
