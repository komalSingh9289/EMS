import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center font-sans">
      <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
      
    </div>
  );
};

export default NotFound;
