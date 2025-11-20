import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Minus } from "lucide-react";
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
    fetchPool(); // We cant use it if we are making it inside the useffect
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading pool data...
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Failed to load pool.
      </div>
    );
  }

const handleLockPool = async () => {
  try {
    navigate(`/lockedpool/${id}`);
    toast.success("Pool locked successfully!");
    fetchPool();
  } catch (error) {
    console.error("Error locking pool:", error);
    toast.error("Failed to lock the pool");
  }
};

const handleDeleteUser = async (userId) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/pools/users/${id}/${userId}`);
    toast.success("User deleted successfully");

    // Update state to remove user immediately (no reload needed)
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

    // Hardcoded dummy user since we had some issue hardcoding it in the backend
    const dummyUser = {
      name: "New User",
      amount: 0,
      upiId: "not-set@upi",
      note: "I just got added!"
    };

    // now send this data as hardcoded
    const response = await axios.post(`http://localhost:5000/api/pools/users/${poolId}`, dummyUser);

    toast.success("Dummy user added successfully");
    console.log("User added:", response.data);
    fetchPool();

  } catch (error) {
    console.error("Error adding user:", error);
    toast.error(error.response?.data?.message || "Failed to add dummy user");
  }
};

  return (

    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >

      {showLockConfirm && (
        <LockConfirmPopup
          onConfirm={async () => {
            setShowLockConfirm(false);
            await handleLockPool();
          }}
          onCancel={() => setShowLockConfirm(false)}
        />
      )}

      <div className="flex flex-col w-[480px] h-[90%] max-w-full max-h-full bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg text-center">
        <div className="flex flex-col items-center justify-center mb-5">
          <div
            className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
        </div>

        {/* Editable Title */}
        <EditableTitle title={pool.title} poolId={id} />

        {/* Main container */}
        <div className="flex flex-col items-center w-full h-[90%] bg-[#E9E9E9] rounded-xl overflow-hidden">
          <div className="flex flex-col items-center w-full h-[80%] bg-[#E9E9E9] mt-2 overflow-y-auto hide-scrollbar">
            {pool.users.map((user, index) => (
              <div
                key={user._id}
                className="flex gap-3 justify-center items-center w-[93%] h-[50px] bg-gray-400 rounded-xl shadow-xl mt-2 shrink-0"
                onClick={() =>
                  navigate(`/pool/${id}/userform/${user._id}`)
                }
              >
                <div className="w-8 h-8 flex justify-center items-center rounded-full text-xl bg-blue-300 hover:bg-blue-500">
                  {index + 1}
                </div>
                <div className="w-[50%] text-left flex items-center text-xl">
                  {user.name}
                </div>
                <div className="w-[15%] text-left text-xl">₹{user.amount}</div>
                <button 
                className="h-7 w-7 border-2 mr-0.5 flex justify-center items-center rounded-full"

                onClick={(e) => {
                  e.stopPropagation();// prevent parent click 
                  handleDeleteUser(user._id); 
                }}
                > 
                  <Minus className="h-7 w-7" />
                </button>
              </div>
            ))}
          </div>

          {/* bottom buttons */}
          <div className="flex justify-center items-center w-full gap-2 mt-3">
          <button
            className="w-[80%] h-[60px] bg-blue-500 rounded-4xl text-2xl"
            onClick={() => {
              if (pool.users.length === 0) {
                toast.error("Number of users can't be null");
                return;
              }
              if (pool.users.every(user => user.amount === 0 )){
                toast.error("All users must have non-zero amount before locking!");
                return;
              }
              setShowLockConfirm(true);
            }}
          >
            Lock
          </button>

            <div 
              className="flex justify-center items-center h-10 w-10 rounded-4xl border-2"
              onClick={() => {
                if (pool.users.length >= 11) {
                  toast.error("Maximum number of users reached!");
                  return;
                }
                handleAddDummyUser(id);
              }}
            >
              <Plus size={30} className="text-black-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPool;
