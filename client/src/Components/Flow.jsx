import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import StartNode from "./Node/StartNode";
import LeadModal from "./Modal/LeadModal";
import DelayModal from "./Modal/DelayModal";
import EmailModal from "./Modal/EmailModal";
import CustomNode from "./Node/CustomNode";
import CustomSeq from "./Node/CustomSeq";
import AddDelayOrEmail from "./Node/AddDelayorEmail";
import CustomEmail from "./Node/CustomEmail";


const nodeTypes = {
  Start: StartNode,
  custom: CustomNode,
  customSeq: CustomSeq,
  addDelayOrEmail:AddDelayOrEmail,
  customEmail: CustomEmail
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      position: { x: 100, y: 0 },
      data: { label: "+", description: "Add Lead Source", target: "lead" },
      type: "Start",
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeModal, setActiveModal] = useState(null); // State to track which modal is open
  const [modalNodeId, setModalNodeId] = useState(null);

  const handleNodeClick = useCallback((event, node) => {
    console.log("Node clicked:", node); // Check node data
    if (node.data.target === "lead") {
      // Open LeadModal for node 1
      setActiveModal("LeadModal");
      setModalNodeId(node.id);
    } else if (node.data.target === "email") {
      console.log("Opening EmailModal for node", node); // Check for email node
      setActiveModal("EmailModal");
      setModalNodeId(node.id);
    } else if (node.data.target === "delay") {
      console.log("Opening DelayModal for node", node); // Check for email node
      setActiveModal("DelayModal");
      setModalNodeId(node.id);
    }
  }, []);

  const closeModal = () => {
    setActiveModal(null); // Close whichever modal is open
    setModalNodeId(null); // Clear the modal node ID
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick} // Handle node clicks
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
      {activeModal === "LeadModal" && (
        <LeadModal
          onClose={closeModal}
          setNodes={setNodes}
          setEdges={setEdges}
          nodes={nodes} // Pass nodes as a prop
          edges={edges}
          currentNodeId={modalNodeId}
        />
      )}
      {activeModal === "EmailModal" && (
        <EmailModal
          onClose={closeModal}
          setNodes={setNodes}
          setEdges={setEdges}
          nodes={nodes} // Pass nodes as a prop
          edges={edges}
          currentNodeId={modalNodeId}
        />
      )}
      {activeModal === "DelayModal" && (
        <DelayModal
          onClose={closeModal}
          setNodes={setNodes}
          setEdges={setEdges}
          nodes={nodes} // Pass nodes as a prop
          edges={edges}
          currentNodeId={modalNodeId}
        />
      )}
    </ReactFlowProvider>
  );
};

export default Flow;
