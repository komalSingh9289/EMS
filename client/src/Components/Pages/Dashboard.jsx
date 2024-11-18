import React, { useContext, useState, useEffect } from "react";
import TopNav from "../TopNav";
import AuthContext from "../../Context/AuthContext";
import Flow from "../Flow";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { user, emailData, delayData, leadData } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    userId: user._id,
    emailId: "",
    delay: "",
    lead: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]); 

  const handleSaveFlow = async () => {
    if(!user || !emailData || !delayData || !leadData){
      toast.error("Please choose Email and specify Delay!");
    }
    
    const updatedData = {
      userId: user._id,
      emailId: emailData._id,
      delay: delayData.delayValue + delayData.delayUnit,
      leadId:leadData._id
    };


  
    try {
      const response = await fetch("http://localhost:5000/api/emailSchedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      if (response.status === 200) {
        toast.success(result.message);
        navigate('/dashboard')
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error scheduling email:", error);
    }
  };
  

  return (
    <div className="flex flex-col">
      <TopNav />
      <div className="flex-grow bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome {user.name}</h2>
        <p>Click on the block to configure and add it in sequence</p>
        <button
          onClick={handleSaveFlow}
          className="bg-blue-600 mb-4 p-2 text-lg float-right rounded-lg hover:bg-blue-700 text-white"
        >
          Save & Schedule
        </button>
        <div className="h-screen w-full bg-white shadow-md rounded-lg overflow-hidden">
          <Flow />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
