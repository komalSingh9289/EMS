// src/Components/Dashboard/TopNav.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const TopNav = () => {
  const { logout } = useContext(AuthContext) // Access logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <NavLink to='/dashboard' className="text-lg font-bold">EMS Dashboard</NavLink>
      <div className="space-x-4">
        <NavLink
          to="/myemails"
          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-red-700 hover:text-white"
        >
          My Emails
        </NavLink>
       
        <button
          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-red-700 hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
