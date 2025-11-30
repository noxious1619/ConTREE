import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, PieChart, CheckCircle2, CircleDollarSign, ArrowRight } from "lucide-react";

function LockedPool_2() {
  const { poolid } = useParams();
  const navigate = useNavigate();

  const [pool, setPool] = useState(null);
  const [settlement, setSettlement] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Pool
  const getPool = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pools/${poolid}`
      );
      setPool(response.data);
      console.log("Fetched pool data:", response.data);
      setLoading(false);

      // 🚨 Safety guard: if somehow pool is NOT locked → send home
      if (!response.data?.isLocked) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error fetching pool:", error);
      setLoading(false);
      navigate("/", { replace: true });
    }
  };

  // Fetch Settlement
  const getSettlement = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/settlement/${poolid}`
      );
      setSettlement(response.data);
      console.log("Fetched settlement pool", response.data);
    } catch (error) {
      console.error("Error fetching settlement:", error);
    }
  };
 
  // handles not going back to unlocked page
  useEffect(() => {
    const handleBack = (event) => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);


  useEffect(() => {
    getSettlement();
    getPool();
  }, [poolid]);


  // Total = sum of all user amounts
  const total =
    pool?.users?.reduce(
      (sum, user) => sum + Number(user.amount || 0),
      0
    ) ?? 0;

  const paid = settlement
    ? settlement.payers
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + Number(p.amount || 0), 0)
    : 0;

  const share =
    pool?.users?.length > 0
      ? (total / pool.users.length).toFixed(2)
      : "0.00";

  const poolAmount = settlement
    ? Number(
        settlement.payers
          .reduce((sum, p) => sum + Number(p.amount || 0), 0)
          .toFixed(2)
      )
    : 0;

  if (loading) {
    return (
        <div
            className="h-screen w-screen bg-center flex items-center justify-center bg-cover font-sans"
            style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
        >
            <div className="flex flex-col items-center gap-3 bg-white/80 p-6 rounded-2xl backdrop-blur-md shadow-xl">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading settlement...</span>
            </div>
        </div>
    );
  }

  if (!pool) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-500 font-bold">
        Failed to load pool
      </div>
    );
  }

  // Build contributions
  const settlementList = [];

  if (settlement) {
    settlement.payers?.forEach((p) =>
      settlementList.push({
        name: p.name,
        amount: p.amount,
        type: "payer",
        status: p.status,
      })
    );

    settlement.receivers?.forEach((r) =>
      settlementList.push({
        name: r.name,
        amount: r.amount,
        type: "receiver",
        status: r.status,
      })
    );
  }

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

        {/* Home Button */}
        <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/40 hover:bg-white/80 text-gray-700 transition-all z-20"
        >
            <ArrowLeft size={20} />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-6 mt-2">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-center bg-contain shadow-md bg-white border-2 border-white/60 mb-3"
                style={{ backgroundImage: "url('/logo_3.png')" }}>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-center px-4 leading-tight">
                {pool.title}
            </h1>
            <div className="flex items-center gap-1 mt-1 px-3 py-1 bg-green-100/80 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Settlement Active</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 px-1">
            {/* Total */}
            <div className="flex flex-col p-4 bg-white/50 rounded-2xl shadow-sm border border-white/50">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">
                    <Wallet size={14} /> Total Pool
                </div>
                <span className="text-2xl font-bold text-gray-800">₹{total}</span>
            </div>

            {/* Share */}
            <div className="flex flex-col p-4 bg-white/50 rounded-2xl shadow-sm border border-white/50">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">
                    <PieChart size={14} /> Per Person
                </div>
                <span className="text-2xl font-bold text-blue-600">₹{share}</span>
            </div>

            {/* Paid */}
            <div className="flex flex-col p-4 bg-green-50/50 rounded-2xl shadow-sm border border-green-100">
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wide mb-1">
                    <CheckCircle2 size={14} /> Paid
                </div>
                <span className="text-xl font-bold text-gray-800">₹{paid}</span>
            </div>

            {/* Pending Amount */}
            <div className="flex flex-col p-4 bg-orange-50/50 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wide mb-1">
                    <CircleDollarSign size={14} /> To Collect
                </div>
                <span className="text-xl font-bold text-gray-800">₹{poolAmount}</span>
            </div>
        </div>

        {/* List Section Title */}
        <div className="flex items-center justify-between px-2 mb-2">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Calculated Settlements</h2>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 w-full bg-white/40 border border-white/30 rounded-3xl shadow-inner overflow-hidden relative flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-3">
            
            {settlementList.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>No settlements required.</p>
              </div>
            )}

            {settlementList.map((item, index) => {
                const isPayer = item.type === "payer";
                
                return (
                    <div
                        key={index}
                        className={`group flex items-center justify-between p-4 
                        rounded-2xl shadow-sm border transition-all duration-200 
                        ${isPayer 
                            ? "bg-red-50/40 hover:bg-red-50/80 border-red-100" 
                            : "bg-green-50/40 hover:bg-green-50/80 border-green-100"}`}
                    >
                        {/* Name Section */}
                        <div className="flex flex-col">
                            <span className="text-gray-800 font-bold text-lg leading-tight">
                                {item.name}
                            </span>
                            <span className={`text-xs font-semibold uppercase tracking-wide mt-1 
                                ${isPayer ? "text-red-500" : "text-green-600"}`}>
                                {isPayer ? "Needs to Pay" : "Receives"}
                            </span>
                        </div>

                        {/* Amount & Action */}
                        <div className="flex items-center gap-3">
                            <span className={`text-xl font-bold ${isPayer ? "text-red-600" : "text-green-600"}`}>
                                ₹{item.amount}
                            </span>

                            {isPayer ? (
                                <button className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95">
                                    Pay <ArrowRight size={14} />
                                </button>
                            ) : (
                                <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-green-200">
                                    <CheckCircle2 size={14} /> Waiting
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LockedPool_2;