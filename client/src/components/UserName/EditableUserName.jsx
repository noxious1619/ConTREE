import React, { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditableUserName = ({ name, maxLength = 25 }) => {
  const { poolid, userid } = useParams(); // ✅ match your route params
  const [pool, setPool] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // ✅ Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // ✅ Fetch pool data (to get user info)
  useEffect(() => {
    const fetchPool = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pools/${poolid}`);
        setPool(res.data);
      } catch (err) {
        console.error("Error fetching pool:", err);
      }
    };
    fetchPool();
  }, [poolid]);

  // ✅ Find the user from the pool once data is fetched
  useEffect(() => {
    if (pool?.users) {
      const foundUser = pool.users.find((u) => u._id === userid);
      if (foundUser) {
        setUser(foundUser);
        setNewName(foundUser.name || "");
      }
    }
  }, [pool, userid]);

  const handleSave = async () => {
    const trimmed = newName.trim();

    if (trimmed.length === 0) {
      toast.error("Name cannot be empty");
      return;
    }
    if (trimmed.length > maxLength) {
      toast.error(`Name cannot exceed ${maxLength} characters`);
      return;
    }

    if (trimmed === user?.name) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);

      // ✅ Update only the specific user’s name in the pool
      const res = await axios.put(
        `http://localhost:5000/api/pools/users/${poolid}/${userid}`,
        { name: trimmed }
      );

      const updatedUser = res.data.user;
      setNewName(updatedUser.name);
      toast.success("User name updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user name:", err);
      toast.error("Failed to update user name");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setNewName(user?.name || "");
      setIsEditing(false);
    }
  };

  if (!user) return <p className="text-gray-500">Loading user...</p>;

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center items-center">
          <input
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            className="border text-2xl focus:outline-none focus:border-blue-500"
          />
          <button
            disabled={
              isLoading ||
              newName.trim().length === 0 ||
              newName.trim() === user?.name
            }
            onClick={handleSave}
            className={`p-2 pl-3 pr-3 hover:bg-blue-500 rounded-xl transition ml-3 h-11 font-semibold ${
              newName.trim() === user?.name ||
              newName.trim().length === 0 ||
              isLoading
                ? "bg-gray-500"
                : "bg-blue-400"
            }`}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center mb-3">
          <h2 className="text-2xl font-medium">{newName}</h2>
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
};

export default EditableUserName;
