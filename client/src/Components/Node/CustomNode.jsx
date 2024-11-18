import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div className="bg-gray-200 p-3 w-36 text-center rounded  relative">
      <button
        onClick={data.removeNode}
        className="absolute top-0 right-2  text-red-600 font-bold"
      >
        ×
      </button>
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

export default CustomNode;
