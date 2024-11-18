import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import TopNav from "../TopNav";

const MyEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  console.log(user._id); // Log to confirm user ID is correct
  
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/emailSchedule/userEmails/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      fetchEmails();
    }
  }, [user._id]); // Dependency array updated to depend on user._id

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <TopNav />
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">My Scheduled Emails</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">Lead</th>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">To</th>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">Subject</th>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">Message</th>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">Delay</th>
                <th className="border-b px-4 py-2 text-sm font-medium text-gray-700">Scheduled Time</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {emails.length > 0 ? (
                emails.map((emailJob) => (
                  <tr key={emailJob._id} className="hover:bg-blue-50 transition duration-300">
                    <td className="px-4 py-2 text-sm text-gray-700">{emailJob.leadId?.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{emailJob.emailId?.to}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{emailJob.emailId?.subject}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{emailJob.emailId?.message}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{emailJob.delay}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(emailJob.scheduledTime).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">No emails found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEmails;
