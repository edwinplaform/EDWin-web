import React from "react";

const HeadlineBar = ({ text, backgroundColor, textColor, animation }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: backgroundColor || "#4caf50", // Default background color
        color: textColor || "#ffffff", // Default text color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: animation || "pulse 2s infinite",
      }}
      className="rounded-lg shadow-md"
    >
      <h1 className="text-lg font-semibold">{text || "Default Headline"}</h1>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default HeadlineBar;
