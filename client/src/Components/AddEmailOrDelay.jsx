import React, { useState, useCallback, useContext } from "react";
import { useReactFlow } from "reactflow";
import EmailModal from "./Modal/EmailModal";
import DelayModal from "./Modal/DelayModal";
import AuthContext from "../Context/AuthContext";

const AddEmailOrDelay = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalNodeId, setModalNodeId] = useState(null);

  const { getNode } = useReactFlow();
 

  const handleNodeClick = useCallback((event, node) => {
    const targetType = node?.data?.target;
    if (targetType === "email") {
      setActiveModal("EmailModal");
      setModalNodeId(node.id);
    } else if (targetType === "delay") {
      setActiveModal("DelayModal");
      setModalNodeId(node.id);
    }
  }, []);

  const closeModal = () => {
    setActiveModal(null);
    setModalNodeId(null);
  };

  return (
    <div>
      <button
        onClick={(e) => {
          const node = getNode(modalNodeId);
          handleNodeClick(e, node);
        }}
        className="w-10 bg-gray-100"
      >
        +
      </button>

      {activeModal === "DelayModal" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <DelayModal onClose={closeModal} currentNodeId={modalNodeId} />
        </div>
      )}
      {activeModal === "EmailModal" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <EmailModal onClose={closeModal} currentNodeId={modalNodeId} />
        </div>
      )}
    </div>
  );
};

export default AddEmailOrDelay;
