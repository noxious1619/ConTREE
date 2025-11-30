import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPoolContent = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center py-10">
      <button
        onClick={() => navigate("/counter")}
        className="group relative flex items-center justify-center w-28 h-28 mb-6 
        bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 
        rounded-full shadow-lg shadow-blue-200/50 
        transition-all duration-300 ease-out transform hover:scale-110 active:scale-95"
      >
        <Plus className="w-12 h-12 text-blue-500 transition-transform duration-300 group-hover:rotate-90 group-hover:text-blue-600" />
      </button>
      
      <div className="text-2xl font-bold text-gray-700 tracking-tight">
        Create a new pool
      </div>
      <p className="text-gray-400 text-sm mt-2 font-medium">
        Tap the plus to start
      </p>
    </div>
  );
};

export default NewPoolContent;