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
          isLocked: pool.isLocked ?? false,
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
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-gray-500 font-medium text-sm animate-pulse">Loading pools...</span>
        </div>
      </div>
    );
  }

  if (!loading && pools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="text-4xl mb-2">📂</div>
        <p className="font-medium">No pools found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-3 pb-2">
      {pools.map((pool) => (
        <div
          onClick={() => handleNavigate(pool)}
          key={pool.id}
          className="group relative flex items-center justify-between p-4 
            bg-white/40 hover:bg-white/90 backdrop-blur-sm 
            border border-white/50 hover:border-blue-200 
            rounded-2xl shadow-sm hover:shadow-md 
            transition-all duration-300 cursor-pointer transform hover:scale-[1.01]"
        >
          {/* Left Side: Name & Status */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${pool.isLocked ? 'bg-red-400' : 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]'}`}></div>
            <div className="flex flex-col min-w-0">
                <span className="text-gray-800 font-semibold text-lg truncate leading-tight">
                    {pool.name}
                </span>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 pl-2">
            {pool.isLocked && <span className="text-lg mr-1">🔒</span>}
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPoolId(pool.id);
                setShowDeletePopup(true);
              }}
              className="p-2 rounded-full hover:bg-red-100/80 transition-colors group-hover:opacity-100 opacity-60"
              title="Delete Pool"
            >
              <img src={DeleteIcon} alt="delete" className="w-4 h-5 opacity-90 hover:opacity-100 transition-opacity" />
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