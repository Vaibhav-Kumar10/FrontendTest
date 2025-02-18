import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Navigate to Profile page directly after clicking "Sign Up"
    navigate("/profile");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
