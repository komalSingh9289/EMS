import React from "react";

const StartNode = ({ data }) => {
  return (
    <div
      className="bg-gray-100 cursor-pointer p-2 text-center"
      onClick={data.onClick}>
      <h4 className="text-sm">{data.label}</h4>
      <p className="text-xs">{data.description}</p>
    </div>
  );
};

export default StartNode;
