import { useContext, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";
import AuthContext from "../../Context/AuthContext";

const EmailModal = ({ onClose, currentNodeId }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");

  const { setNodes, setEdges, getNode, getNodes } = useReactFlow();
  const { setEmailData } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/email"); // Update the URL if needed
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handleSelect = () => {
    if (!selectedEmail) {
      alert("Please select a lead.");
      return;
    }

    // Find the full object of the selected lead
    const selectedEmailData = emails.find(
      (email) => email._id === selectedEmail
    );

    if (!selectedEmailData) {
      console.error("Selected email data not found:", selectedEmail);
      return;
    }

    setEmailData(selectedEmailData);

    // Proceed with node and edge creation immediately after form submission
    const currentNode = getNode(currentNodeId);
    if (!currentNode) {
      console.error("Current node not found!");
      return;
    }

    const removeNode = (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    };

    // Calculate new position: Directly above the current node
    const newPosition = {
      x: currentNode.position.x,
      y: currentNode.position.y, // Adjust the position as needed
    };

    // Dynamically generate a unique ID for the new node
    const newNodeId = `email-${Date.now()}`;

    // Define the new node
    const newNode = {
      id: newNodeId,
      position: newPosition,
      data: {
        label: `${selectedEmailData.subject}`,
        target: "emailData",
        removeNode: () => removeNode(newNodeId),
      },
      type: "customEmail",
      draggable: false,
    };

    // Dynamically generate the edge ID
    const newEdgeId = `seq-email-${currentNodeId}-${newNodeId}`;

    // Define the new edge
    const newEdge = {
      id: newEdgeId,
      source: currentNodeId,
      target: newNodeId,
      type: "smoothstep",
    };

    // Log the new node and edge for debugging
    console.log("New Node:", newNode);
    console.log("New Edge:", newEdge);

    // Update nodes and edges
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);

    // Delay before updating existing nodes
    setTimeout(() => {
      const updatedNodes = getNodes().map((node) => {
        if (node.data.target === "email") {
          return {
            ...node,
            data: {
              ...node.data,
              target: "delay",
            },
            position: {
              ...node.position,
              y: node.position.y + 100,
            },
          };
        }
        return node;
      });

      setNodes(updatedNodes);
    }, 200); // Adjust the delay time as needed

    // Close the modal after nodes are added
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-3">Choose Email</h2>
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          className="w-full p-2 mb-3"
        >
          <option value="">Select a Email</option>
          {emails.map((email) => (
            <option key={email._id} value={email._id}>
              {email.subject}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white hover:bg-red-600 p-2 mt-2"
          >
            Close
          </button>
          <button
            onClick={handleSelect}
            className="bg-blue-500 p-2 mt-2 text-white hover:bg-blue-600"
          >
            Select Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
