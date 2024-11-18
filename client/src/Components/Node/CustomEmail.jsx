import React from "react";
import { Handle, Position } from "reactflow";

const AddDelayOrEmail = ({ data }) => {
  return (
    <div className="bg-gray-200 p-3 w-36 text-center rounded  relative">
      <button
        onClick={data.removeNode}
        className="absolute top-0 right-2  text-red-600 font-bold"
      >
        ×
      </button>
      <Handle
        type="target" // Incoming connection
        position={Position.Top} // Top position
        style={{ background: "#555" }}
      />
      <p className="text-xs p-1">{data.label}</p>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output" // Unique ID for the handle (optional)
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default AddDelayOrEmail;
