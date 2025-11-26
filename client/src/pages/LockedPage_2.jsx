import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { use } from "react";

function LockedPool_2() {
  
  const { poolid } = useParams();

  const [pool, setPool] = useState(null);
  const [settlement, setSettlement] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPool = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pools/${poolid}`)
      setPool(response.data);
      console.log("Fetched pool data:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pool:", error);
      setLoading(false);
    }
  };

  const getSettlement = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/settlement/${poolid}`);
      setSettlement(response.data);
      console.log("Fetched settlement pool", settlement)
    }catch (error) {
      console.error("Error fetching pool:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSettlement()
  }, []);

  const total = pool ? pool.users.reduce((sum, user) => sum + user.amount, 0) : 0;
  const share = pool ? pool.users.length > 0 ? (total / pool.users.length) : 0 : 0;



  useEffect(() => {
    getPool();
  }, [poolid]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Failed to load pool
      </div>
    );
  }

  const c = pool.contributions || [];
  const settlementList = [];

  if (settlement) {
    settlement.payers?.forEach(p => {
      settlementList.push({
        name: p.name,
        amount: p.amount,
        type: "payer",
        status: p.status
      });
    });

    settlement.receivers?.forEach(r => {
      settlementList.push({
        name: r.name,
        amount: r.amount,
        type: "receiver",
        status: r.status
      });
    });
  }


  return (
    <div
      className="h-screen w-screen bg-center flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Outer Card */}
      <div className="flex flex-col w-[480px] h-[90%] bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-200">

        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-30 h-30 rounded-full flex items-center justify-center bg-center bg-contain"
          style={{ backgroundImage: "url('/logo_3.png')" }}>
          </div>
        </div>

        {/* Dynamic Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6 tracking-wide">
          {pool.title}
        </h1>

        {/* Main Content Box */}
        <div className="flex flex-col items-center w-full h-full bg-[#f7f8fa] rounded-2xl shadow-inner p-4 overflow-hidden">

          {/* Number Summary (NO MAP) */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6">

            {/* Total */}
            <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md py-3 transition">
              <span className="text-gray-500 text-sm font-medium">Total</span>
              <span className="text-lg font-semibold text-gray-800">₹ {total}</span>
            </div>

            {/* Paid */}
            <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md py-3 transition">
              <span className="text-gray-500 text-sm font-medium">Paid</span>
              <span className="text-lg font-semibold text-gray-800">₹{pool.paid}</span>
            </div>

            {/* Share */}
            <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md py-3 transition">
              <span className="text-gray-500 text-sm font-medium">Share</span>
              <span className="text-lg font-semibold text-gray-800">₹ {share}</span>
            </div>

            {/* Pool */}
            <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md py-3 transition">
              <span className="text-gray-500 text-sm font-medium">Pool</span>
              <span className="text-lg font-semibold text-gray-800">₹{pool.poolAmount}</span>
            </div>

          </div>

          {/* Contributions (NO MAP) */}
          <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow-sm overflow-y-auto px-3 py-2">
            <h2 className="text-lg font-medium text-gray-700 mb-3">
              Contributions
            </h2>
            {settlementList.length === 0 && (
              <p className="text-gray-600 text-sm text-center">No settlement found</p>
            )}

            {settlementList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#f9fafb] rounded-xl px-4 py-3 mb-2"
              >
                {/* NAME */}
                <span className="text-gray-700 font-medium w-1/3">
                  {item.name}
                </span>

                {/* AMOUNT */}
                <span
                  className={
                    `font-semibold w-1/3 text-center ` +
                    (item.type === "payer" ? "text-red-500" : "text-green-600")
                  }
                >
                  ₹{item.amount}
                </span>

                {/* BUTTON */}
                <span className="w-1/3 text-right">
                  {item.type === "payer" ? (
                    <button className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm">
                      Pay
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm">
                      Receive
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockedPool_2;
