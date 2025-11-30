import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Trash2, ArrowLeft, Lock } from "lucide-react";
import EditableTitle from "../components/PoolName/EditablePoolName";
import toast from "react-hot-toast";
import LockConfirmPopup from "../components/lockConfirmPopup";

function NewPool() {
  const { id } = useParams();
  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLockConfirm, setShowLockConfirm] = useState(false);

  const navigate = useNavigate();

  const fetchPool = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pools/${id}`);
      setPool(res.data);
    } catch (err) {
      console.error("Error fetching pool:", err);
      toast.error("Failed to fetch pool");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPool();
  }, [id]);

  const handleLockPool = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/pools/${id}/toggle-lock`);
      await axios.post(`http://localhost:5000/api/settlement/generate/${id}`);
      const updated = await axios.get(`/api/pool/${id}`);
      console.log("settlement Data :", updated.data.settlement);
      toast.success("Pool locked & settlement generated!");
      navigate(`/lockedpool/${id}`);
    } catch (error) {
      console.error("Error locking pool:", error);
      toast.error("Failed to lock the pool");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/pools/users/${id}/${userId}`
      );
      toast.success("User deleted successfully");

      setPool((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user._id !== userId),
      }));
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const handleAddDummyUser = async (poolId) => {
    try {
      const dummyUser = {
        name: "New User",
        amount: 0,
        upiId: "not-set@upi",
        note: "I just got added!",
      };

      const response = await axios.post(
        `http://localhost:5000/api/pools/users/${poolId}`,
        dummyUser
      );

      toast.success("Dummy user added successfully");
      console.log("User added:", response.data);
      fetchPool();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.response?.data?.message || "Failed to add dummy user");
    }
  };

  if (loading) {
    return (
      <div
        className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
        style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
      >
        <div className="flex flex-col items-center gap-3 bg-white/80 p-6 rounded-2xl backdrop-blur-md">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading pool...</span>
        </div>
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500 bg-white">
        Failed to load pool.
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {showLockConfirm && (
        <LockConfirmPopup
          onConfirm={async () => {
            setShowLockConfirm(false);
            await handleLockPool();
          }}
          onCancel={() => setShowLockConfirm(false)}
        />
      )}

      {/* Main Glass Card */}
      <div className="relative z-10 flex flex-col w-[480px] h-[90%] max-h-[850px] max-w-[95%] 
        bg-white/70 backdrop-blur-xl border border-white/40 
        p-6 rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* Back Navigation */}
        <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/40 hover:bg-white/80 text-gray-700 transition-all z-20"
        >
            <ArrowLeft size={20} />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-4 mt-2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-center bg-contain shadow-md bg-white border-2 border-white/60 mb-3"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
          
          {/* Editable Title Component Wrapper */}
          <div className="w-full text-center">
            <EditableTitle title={pool.title} poolId={id} />
          </div>
        </div>

        {/* Users List Container */}
        <div className="flex-1 w-full bg-white/40 border border-white/30 rounded-3xl shadow-inner overflow-hidden relative flex flex-col">
          
          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-3">
            {pool.users.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                    <p>No users yet.</p>
                    <p className="text-sm">Click + to add someone.</p>
                </div>
            ) : (
                pool.users.map((user, index) => (
                <div
                    key={user._id}
                    className="group flex items-center justify-between p-3 
                    bg-white/60 hover:bg-white/90 border border-white/50 
                    rounded-2xl shadow-sm hover:shadow-md 
                    transition-all duration-200 cursor-pointer transform hover:scale-[1.01]"
                    onClick={() => navigate(`/pool/${id}/userform/${user._id}`)}
                >
                    {/* Left: Index & Name */}
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm shadow-sm">
                            {index + 1}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-gray-800 font-semibold truncate leading-tight">
                                {user.name}
                            </span>
                        </div>
                    </div>

                    {/* Right: Amount & Delete */}
                    <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-700 bg-gray-100/50 px-2 py-1 rounded-lg">
                            ₹{user.amount}
                        </span>
                        
                        <button
                            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user._id);
                            }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                ))
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/40 flex items-center gap-3">
            
            {/* Lock Button */}
            <button
              className="flex-1 h-[56px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 
              text-white rounded-2xl text-lg font-bold shadow-lg shadow-blue-500/30 
              flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              onClick={() => {
                if (pool.users.length === 0) {
                  toast.error("Number of users can't be null");
                  return;
                }
                if (pool.users.every((user) => user.amount === 0)) {
                  toast.error("A Single user must have non-zero amount before locking!");
                  return;
                }
                setShowLockConfirm(true);
              }}
            >
              <Lock size={20} />
              Lock Pool
            </button>

            {/* Add User Button */}
            <button
              className="h-[56px] w-[56px] bg-white hover:bg-blue-50 text-blue-600 
              border-2 border-blue-100 rounded-2xl shadow-md 
              flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
              onClick={() => {
                if (pool.users.length >= 11) {
                  toast.error("Maximum number of users reached!");
                  return;
                }
                handleAddDummyUser(id);
              }}
            >
              <Plus size={28} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewPool;