import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";

const EditableUserName = ({ name, nameId, maxLength = 25 }) => {

    // navigate(`/pool/${id}/userform/${user._id}`) path for new userform

    const { poolId, userId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus();
        }
      }, [isEditing]);

    useEffect(() => {
    setNewName(name);
    }, [name]);

  const handleSave = async () => {
    const trimmed = newName.trim();

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

    if (trimmed === name) {
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


  return (
    <div className='text-2xl bg-black w-[30px] h-[30px]'>EditableUserName</div>
  )
}

export default EditableUserName