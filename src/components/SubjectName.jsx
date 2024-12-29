import React from "react";

const SubjectName = ({text,backgroundColor,textColor,animation}) =>{
    return (
        <div
        
        className="rounded-lg shadow-md w-full h-10 bg-teal-500 text-white flex items-center justify-left "
        >
            <h1 className="text-lg font-semibold m-10">{text || "Default Headline"}</h1>
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
    )
}

export default SubjectName;