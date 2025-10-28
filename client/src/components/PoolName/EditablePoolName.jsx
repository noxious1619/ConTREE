import React, { useState, useEffect, useRef } from "react";
import { Edit2, Loader2 } from "lucide-react";
import toast from 'react-hot-toast';


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

      const res = await fetch(`http://localhost:5000/api/pools/${poolId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });
      const updatedPool = await res.json();
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
      <div className="flex border-2 justify-center items-center ">
        <input 
        ref={inputRef}
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            className="border-2  text-2xl focus:outline-none focus:border-blue-500"
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
      <div className="flex border- justify-center items-center mb-3 borde">
        <h2 className="text-2xl font-medium">{title}</h2>
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
