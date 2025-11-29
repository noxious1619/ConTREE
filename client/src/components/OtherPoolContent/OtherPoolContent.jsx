import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../../public/delete.png";
import DeleteConfirmPopup from "../DeleteConfirmPopup";
import axios from "axios";

const OtherPoolsContent = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedPoolId, setSelectedPoolId] = useState(null);



  const navigate = useNavigate();

  const handleNavigate = (pool) => {
    if (!pool.isLocked) {
      navigate(`/newpool/${pool.id}`);
    } else {
      navigate(`/lockedpool/${pool.id}`);
    }
  };

  const handleDeletePool = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pools/${selectedPoolId}`);
      console.log("Pool and its settlement deleted");
      setShowDeletePopup(false);
      setPools((prev) => prev.filter((p) => p.id !== selectedPoolId));

    } catch (err) {
      console.error("Failed to delete pool:", err);
    }
  };

  useEffect(() => {
    const fetchPools = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/pools");
        const data = await response.json();
        console.log("data: ", data);

        const simplified = data.map((pool) => ({
          id: pool._id,
          name: pool.title,
          isLocked: pool.isLocked ?? false, // ensure exists
        }));

        setPools(simplified || []);
      } catch (error) {
        console.error("Failed to fetch pools:", error);
        setPools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  if (loading) {
    return (
      <div className="text-xl text-gray-400 animate-pulse">
        Loading pools...
      </div>
    );
  }

  if (!loading && pools.length === 0) {
    return (
      <div className="text-xl text-gray-600">
        No pools found
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 gap-3 h-full overflow-y-auto pt-4 pb-4 custom-scrollbar">
      {pools.map((pool) => (
        <div
          onClick={() => handleNavigate(pool)}
          key={pool.id}
          className="p-4 rounded-xl bg-white shadow-xl flex items-center justify-between"
        >
          <div className="text-lg font-semibold text-gray-800">
            {pool.name}{pool.isLocked && <span className="ml-2">🔒</span>}
          </div>
          <div className="flex">
            <button 
              onClick={(e) => {
                e.stopPropagation();   // ⛔ stop parent click
                setSelectedPoolId(pool.id);
                setShowDeletePopup(true);
              }}
            >
              <img src={DeleteIcon} alt="delete" className="h-7 w-5 ml-3" />
            </button>
          </div>
        </div>
      ))}

      {showDeletePopup && (
        <DeleteConfirmPopup
          onConfirm={handleDeletePool}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

    </div>
  );
};

export default OtherPoolsContent;
