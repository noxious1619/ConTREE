import React, { useState, useEffect } from 'react';
import EditableUserName from '../components/UserName/EditableUserName';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, IndianRupee, AtSign, StickyNote, Save } from "lucide-react";

function UserForm() {
  const { poolid, userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let amountTimeout;

  const handleAmountChange = (e) => {
    const input = e.target;
    const value = Number(input.value);

    clearTimeout(amountTimeout);

    amountTimeout = setTimeout(() => {
      if (value <= 0) {
        toast.error("Amount cannot be zero or negative!");
        input.value = "";
      }
    }, 800);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pools/${poolid}`);
        const pool = res.data;

        const foundUser = pool.users.find((u) => u._id === userid);
        setUserData(foundUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [poolid, userid]);

  if (loading) {
    return (
        <div
            className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
            style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
        >
            <div className="flex flex-col items-center gap-3 bg-white/80 p-6 rounded-2xl backdrop-blur-md shadow-xl">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading details...</span>
            </div>
        </div>
    );
  }

  if (!userData) return <div className="text-center mt-10 text-red-500">User not found.</div>;

  // Define original data (after fetch)
  const originalData = {
    amount: userData.amount?.toString() || "",
    upiId: userData.upiId || "",
    note: userData.note || "",
  };

  // --- HANDLE SUBMIT ---
  const handleSubmit = async () => {
    const amountInput = document.getElementById("amountInput");
    const upiInput = document.getElementById("upiInput");
    const noteInput = document.getElementById("noteInput");

    const amountValue = amountInput.value.trim();
    const upiValue = upiInput.value.trim();
    const noteValue = noteInput.value.trim();

    const payload = {};

    // Add ONLY changed + non-empty fields
    if (amountValue !== "" && amountValue !== originalData.amount) {
      payload.amount = Number(amountValue);
    }

    if (upiValue !== "" && upiValue !== originalData.upiId) {
      payload.upiId = upiValue;
    }

    if (noteValue !== "" && noteValue !== originalData.note) {
      payload.note = noteValue;
    }

    // If nothing changed, return back
    if (Object.keys(payload).length === 0) {
      navigate(-1);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/pools/users/${poolid}/${userid}`,
        payload
      );

      toast.success("Details updated!");
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update. Try again!");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {/* Main Glass Card */}
      <div className="relative z-10 flex flex-col w-[480px] h-[90%] max-h-[850px] max-w-[95%] 
        bg-white/70 backdrop-blur-xl border border-white/40 
        p-6 rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500">

        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/40 hover:bg-white/80 text-gray-700 transition-all z-20"
        >
            <ArrowLeft size={20} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-2 mt-2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-center bg-contain shadow-md bg-white border-2 border-white/60 mb-3"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          ></div>
        </div>

        {/* Editable Name Component */}
        <div className="mb-6 flex justify-center w-full">
            <EditableUserName name={userData.name} userId={userid} />
        </div>

        {/* Form Container */}
        <div className="flex-1 w-full bg-white/40 border border-white/30 rounded-3xl shadow-inner p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar">

          <div className="flex flex-col w-full gap-5">
            
            {/* Amount Input */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Contribution Amount</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 bg-blue-100 p-1.5 rounded-lg">
                        <IndianRupee size={18} />
                    </div>
                    <input
                        type="number"
                        id="amountInput"
                        min="0"
                        onChange={handleAmountChange}
                        placeholder={userData.amount || "0"}
                        className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/60 border border-white/50 
                        text-xl font-bold text-gray-800 placeholder-gray-400 outline-none 
                        focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* UPI Input */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">UPI ID</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 bg-purple-100 p-1.5 rounded-lg">
                        <AtSign size={18} />
                    </div>
                    <input
                        type="text"
                        id="upiInput"
                        maxLength="50"
                        placeholder={userData.upiId || "example@upi"}
                        className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/60 border border-white/50 
                        text-lg font-medium text-gray-800 placeholder-gray-400 outline-none 
                        focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Note Input */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Note / Description</label>
                <div className="relative group">
                    <div className="absolute left-3 top-4 text-orange-500 bg-orange-100 p-1.5 rounded-lg">
                        <StickyNote size={18} />
                    </div>
                    <textarea
                        id="noteInput"
                        maxLength="200"
                        placeholder={userData.note || "Add a note..."}
                        className="w-full pl-14 pr-4 py-4 h-[120px] rounded-2xl bg-white/60 border border-white/50 
                        text-lg font-medium text-gray-800 placeholder-gray-400 outline-none resize-none
                        focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all shadow-sm"
                    />
                </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 
            text-white rounded-2xl text-xl font-bold shadow-lg shadow-blue-500/30 
            flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={handleSubmit}
          >
            <Save size={22} />
            Save Details
          </button>

        </div>
      </div>
    </div>
  );
}

export default UserForm;