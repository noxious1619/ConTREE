// chatgpt

import React from 'react';
import { Plus, Minus, Edit2, User, DollarSign, Users, Calendar } from "lucide-react";

function LockedPool_2() {
  return (
    <div
      className="h-screen w-screen bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Outer Card */}
      <div className="flex flex-col w-[480px] h-[90%] max-w-full max-h-full bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-200">

        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div
            className="w-24 h-24 rounded-full bg-center bg-contain bg-no-repeat shadow-md"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6 tracking-wide">
          Trip to Manali
        </h1>

        {/* Main Content Box */}
        <div className="flex flex-col items-center w-full h-full bg-[#f7f8fa] rounded-2xl shadow-inner p-4 overflow-hidden">

          {/* Number Summary */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            {[
              { label: 'Total', value: '₹254' },
              { label: 'Paid', value: '₹9.5' },
              { label: 'Share', value: '₹64.5' },
              { label: 'Pool', value: '₹40' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md py-3 hover:shadow-lg transition"
              >
                <span className="text-gray-500 text-sm font-medium">
                  {item.label}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Contribution List */}
          <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow-sm overflow-y-auto px-3 py-2">
            <h2 className="text-lg font-medium text-gray-700 mb-3">
              Contributions
            </h2>

            {[
              { name: 'Suresh', amount: '₹9.5', color: 'text-green-600', status: '16/2/2025', isButton: false },
              { name: 'Ramesh', amount: '₹30.5', color: 'text-red-500', status: 'Pay', isButton: true },
              { name: 'Raina', amount: '₹4.5', color: 'text-green-500', status: 'Not paid', isButton: false },
              { name: 'Suresh', amount: '₹35.5', color: 'text-green-500', status: 'Not paid', isButton: false },
            ].map((person, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-[#f9fafb] rounded-xl px-4 py-3 mb-2 hover:bg-[#eef2f7] transition"
              >
                <span className="text-gray-700 font-medium w-1/3 text-left">
                  {person.name}
                </span>
                <span className={`font-semibold w-1/3 text-center ${person.color}`}>
                  {person.amount}
                </span>
                <span className="w-1/3 text-right">
                  {person.isButton ? (
                    <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition">
                      {person.status}
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">{person.status}</span>
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
