import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const OtherPoolsContent = () => {

    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pools");
        const data = await response.json();
        const simplified = data.map(pool => ({
            id: pool._id,
            name: pool.title
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
      <div className="text-xl text-gray-500 animate-pulse">
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
          key={pool.id}
          className="p-4 rounded-xl bg-white shadow flex items-center justify-between"
        >
          <div className="text-lg font-semibold text-gray-800">
            {pool.name}
          </div>

          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-lg"
            onClick={() => navigate(`/newpool/${pool.id}`)}
          >
            View
          </button>
        </div>
      ))}

    </div>
  );
};

export default OtherPoolsContent;
