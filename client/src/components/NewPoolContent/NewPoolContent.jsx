import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPoolContent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => navigate("/counter")}
        className="rounded-full bg-[#C4E4FF] p-2 mb-4"
      >
        <Plus className="w-25 h-25 text-blue-500" />
      </button>
      <div className="max-w-md text-2xl font-semibold">Create a new pool</div>
    </div>
  );
};

export default NewPoolContent;
