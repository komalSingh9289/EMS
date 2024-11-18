import React, { useContext, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";
import AuthContext from "../../Context/AuthContext";

const LeadModal = ({ onClose, nodes }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState("");
  const { setNodes } = useReactFlow();
  const { setEdges } = useReactFlow();
  const { setLeadData } = useContext(AuthContext);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leadSource"); // Update the URL if needed
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  const handleSelect = () => {
    if (!selectedLead) {
      alert("Please select a lead.");
      return;
    }

    // Find the full object of the selected lead
    const selectedLeadData = leads.find((lead) => lead._id === selectedLead);

    if (!selectedLeadData) {
      console.error("Selected lead data not found:", selectedLead);
      return;
    }

    setLeadData(selectedLeadData);


    const prevNode = nodes[nodes.length - 1]; // Get the last node in the current nodes list

    let prevNodeTarget = "defaultTarget"; // Default value if no previous node target is found

    // If the previous node exists, get its target
    if (prevNode && prevNode.data && prevNode.data.target) {
      prevNodeTarget = prevNode.data.target;
    }

    const removeNode = (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    };

    // Generate unique IDs using Date.now() for new nodes
    const newNode1Id = Date.now(); // Use Date.now() to ensure unique ID
    const newNode2Id = Date.now() + 1; // Ensure second node has a unique ID
    const newNode3Id = Date.now() + 2;

    // Add the selected lead as a new node
    const newNode1 = {
      id: `${newNode1Id}`, // Generate a new unique ID for the first node
      position: { x: 200, y: 100 },
      data: {
        label: selectedLeadData.title,
        removeNode: () => removeNode("2"),
      },
      type: "custom",
      draggable: false,
    };

    const newNode2 = {
      id: `${newNode2Id}`,
      position: { x: 200, y: 200 },
      data: { label: "Sequence Start here" },
      draggable: false,
      type:'customSeq',
    };

    const newNode3 = {
      id: "2",
      position: { x: 200, y: 300 },
      data: { label: "+", target: "email" },
      draggable: false,
      type:'addDelayOrEmail'
    };
    // Create an edge connecting the two nodes
    const newEdge = {
      id: `e${newNode1.id}-${newNode2.id}`, // Unique edge ID based on node IDs
      source: newNode1.id, // ID of the source node
      target: newNode2.id,
      type: "smoothstep", // Edge type (can be any React Flow edge type)
    };
    const newEdge2 = {
      id: `e${newNode2.id}-${newNode3.id}`, // Unique edge ID based on node IDs
      source: newNode2.id, // ID of the source node
      target: newNode3.id,
      type: "smoothstep", // Edge type (can be any React Flow edge type)
    };

    // Update the nodes and edges states
    setNodes((prevNodes) => [...prevNodes, newNode1, newNode2, newNode3]);
    setEdges((prevEdges) => [...prevEdges, newEdge, newEdge2]);

    onClose(); // Close the modal after adding the node
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-3">Choose Lead Source</h2>
        <select
          value={selectedLead}
          onChange={(e) => setSelectedLead(e.target.value)}
          className="w-full p-2 mb-3"
        >
          <option value="">Select a Lead</option>
          {leads.map((lead) => (
            <option key={lead._id} value={lead._id}>
              {lead.title}
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
            Select Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
