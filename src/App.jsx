import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Signup from "./components/SignUp";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Reminder from "./components/Reminder.jsx";
import SOS from "./components/SOS.jsx";

function App() {
  return (
    <Routes>
      {/* Show Splash Screen initially */}
      <Route path="/" element={<SplashScreen />} />

      {/* Signup Page - Always accessible */}
      <Route path="/signup" element={<Signup />} />

      {/* Profile Page - Navigate to it directly after signup */}
      <Route path="/profile" element={<Profile />} />

      {/* Other routes */}
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reminder" element={<Reminder />} />
      <Route path="/sos" element={<SOS />} />
    </Routes>
  );
}

export default App;
