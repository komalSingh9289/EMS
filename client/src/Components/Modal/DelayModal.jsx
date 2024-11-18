import { useContext, useState } from "react";
import { useReactFlow } from "reactflow";
import AuthContext from "../../Context/AuthContext";

const DelayModal = ({ onClose, currentNodeId }) => {
  const [delayValue, setDelayValue] = useState(""); // State for the delay value
  const [delayUnit, setDelayUnit] = useState(""); // State for the delay unit

  const { setNodes, setEdges, getNode, getNodes } = useReactFlow();
  const { setDelayData } = useContext(AuthContext);

  const handleSubmit = () => {
    if (!delayValue || !delayUnit) {
      alert("Please fill out both the delay value and unit!");
      return;
    }

    setDelayData({
      delayUnit,
      delayValue,
    });

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
        label: `${delayValue + delayUnit}`,
        target: "delayData",
        removeNode: () => removeNode(newNodeId),
      },
      type: "customEmail",
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

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);

    setTimeout(() => {
      const updatedNodes = getNodes().map((node) => {
        if (node.data.target === "delay") {
          return {
            ...node,
            data: {
              ...node.data,
              target: "email",
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
    }, 200);

    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-3">Add Delay</h2>

        {/* Input for Delay Value */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Value:</label>
          <input
            type="number"
            className="w-full p-2 border"
            placeholder="Enter delay value"
            value={delayValue}
            onChange={(e) => setDelayValue(e.target.value)}
          />
        </div>

        {/* Dropdown for selecting the unit */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Unit:</label>
          <select
            className="w-full p-2 border"
            value={delayUnit}
            onChange={(e) => setDelayUnit(e.target.value)}
          >
            <option value="" disabled>
              Select unit
            </option>
            <option value="m">Minutes</option>
            <option value="h">Hours</option>
            <option value="d">Days</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white hover:bg-red-600 p-2"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-600 p-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelayModal;
