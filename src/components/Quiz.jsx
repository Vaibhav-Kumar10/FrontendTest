import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const user_id = localStorage.getItem("user_id"); // Retrieve user_id from localStorage

  // Quiz Data
  const quizData = [
    {
      question: "How often do you experience asthma symptoms?",
      options: [
        "Less than once a month",
        "1-2 times a month",
        "Frequently (Weekly)",
        "Daily",
      ],
      store: true,
    },
    {
      question: "Which of the following commonly trigger your symptoms?",
      options: [
        "Pollen",
        "Dust",
        "Humidity",
        "Temperature changes",
        "Air pollution",
      ],
      store: true,
    },
    {
      question:
        "Do you notice symptoms worsening in specific weather conditions?",
      options: [
        "Hot and humid",
        "Cold",
        "Windy and dry",
        "No specific triggers",
      ],
      store: true,
    },
    {
      question:
        "Do you live in or frequently visit areas with poor air quality?",
      options: ["Yes, often", "No", "Occasionally"],
      store: true,
    },
    {
      question: "Do you experience difficulty breathing at night?",
      options: ["Frequently", "Occasionally", "Rarely", "Never"],
      store: true,
    },
  ];

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: option, // Always store only ONE selected option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish(); // Send data on finish
    }
  };

  const handleFinish = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("User ID not found. Please complete profile first.");
      return;
    }

    // Extract only required answers
    const storedAnswers = {};
    quizData.forEach((q, index) => {
      if (q.store && selectedOptions[index]) {
        storedAnswers[q.question] = selectedOptions[index]; // Store only one answer
      }
    });

    console.log("Final stored answers:", storedAnswers); // Debugging step

    try {
      // const response = await axios.post("http://127.0.0.1:5000/submit-quiz", {
      const response = await axios.post(
        "https://backend-hyv7.onrender.com/submit-quiz",
        {
          user_id,
          answers: storedAnswers,
        }
      );

      if (response.status === 201) {
        navigate("/dashboard"); // Redirect to Dashboard after quiz submission
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-white p-4 w-full">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-purple-600">Question</h2>
        <p className="text-gray-700 mt-2">
          {quizData[currentQuestion].question}
        </p>
        <div className="mt-4 space-y-3 w-full">
          {quizData[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionToggle(option)}
              className={`w-full py-3 px-4 rounded-lg text-lg border-2 transition-all ${
                selectedOptions[currentQuestion] === option
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300 bg-white"
              } focus:outline-none active:scale-95`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next / Finish Button */}
      <button
        onClick={handleNext}
        className="mt-6 bg-purple-600 text-white py-3 px-6 rounded-2xl text-lg shadow-md w-full max-w-md active:scale-95"
      >
        {currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
};

export default Quiz;
