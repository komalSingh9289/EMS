import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Pages/Signup";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import NotFound from "./Components/Pages/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import MyEmails from "./Components/Pages/MyEmails";

function App() {
  return (
    <Router  future={{ v7_startTransition: true }}>
      <div>
        {/* You can add navigation links here if needed */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myemails"
            element={
              <ProtectedRoute>
                <MyEmails />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
