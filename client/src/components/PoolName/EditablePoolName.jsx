import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import toast from 'react-hot-toast';
import axios from "axios";


function EditableTitle({ title, poolId, maxLength = 25 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);


  // Auto focus when edit mode starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleSave = async () => {
    const trimmed = newTitle.trim();

    if (trimmed.length === 0) {
      toast.error("Name cannot be empty");
      setError("Name cannot be empty");
      return;
    }
    if (trimmed.length > maxLength) {
      toast.error(`Name cannot exceed ${maxLength} characters`);
      setError(`Name cannot exceed ${maxLength} characters`);
      return;
    }

    if (trimmed === title) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);

      //update the pool name via API
      const res = await axios.put(
        `http://localhost:5000/api/pools/${poolId}`, 
      { title: trimmed },
      { headers: { "Content-Type": "application/json" } }
      );

      const updatedPool = res.data;
      setNewTitle(updatedPool.title);
      toast.success("Title updated successfully");
      
      setIsEditing(false);
      setError("");
    } catch (err) {
      console.error("Failed to update pool name:", err);
      toast.error("Failed to update pool name");
      setError("Couldn't update name. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setNewTitle(title);
      setIsEditing(false);
      setError("");
    }
  };

return (
  <div>
    {isEditing ? (
      <div className="flex justify-center items-center ">
        <input 
        ref={inputRef}
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            className=" border text-2xl focus:outline-none focus:border-blue-500"
        />
        <button
          disabled={
            isLoading ||
            newTitle.trim().length === 0 ||
            newTitle.trim() === title
          } 
          onClick={handleSave}
          className={`p-2 pl-3 pr-3 hover:bg-blue-500 rounded-xl transition ml-3 h-11 font-semibold ${
            newTitle.trim() === title || newTitle.trim().length === 0 || isLoading ? "bg-gray-500" : "bg-blue-400"
          }`}
        >
          Save
        </button>
      </div>
    ) : (
      <div className="flex justify-center items-center mb-3 borde">
        <h2 className="text-2xl font-medium">{newTitle}</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 hover:bg-blue-500 rounded-xl transition ml-3 bg-blue-400"
        >
          <Edit2 size={19} />
        </button>
      </div>
    )}
  </div>
);


}

export default EditableTitle;
