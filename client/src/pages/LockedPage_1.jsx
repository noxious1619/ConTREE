// Grok

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleCreatePool } from '../features/home/homeSlice';
import { Plus, Minus, Edit2, User, DollarSign, Users, Calendar } from "lucide-react";

const contributionsData = [
  {
    id: 1,
    name: 'Suresh',
    amount: 9.5,
    status: 'paid',
    date: 'Feb 16, 2025'
  },
  {
    id: 2,
    name: 'Ramesh',
    amount: 30.5,
    status: 'unpaid',
    date: null
  },
  {
    id: 3,
    name: 'Raina',
    amount: 4.5,
    status: 'partial',
    date: 'Feb 16, 2025'
  },
  {
    id: 4,
    name: 'Priya', // Fixed duplicate
    amount: 35.5,
    status: 'unpaid',
    date: null
  }
];

const summaryData = [
  { label: 'Total', value: 254, icon: DollarSign, color: 'blue' },
  { label: 'Paid', value: 9.5, icon: DollarSign, color: 'green' },
  { label: 'Share', value: 64.5, icon: Users, color: 'orange' },
  { label: 'Pool', value: 40, icon: Users, color: 'purple' }
];

function LockedPool_1() {
  // const dispatch = useDispatch();
  // const showCreatePool = useSelector((state) => state.home.showCreatePool);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-orange-600 bg-orange-100';
      case 'unpaid': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status, date) => {
    if (status === 'unpaid') return 'Pay Now';
    if (date) return date;
    return 'Not Paid';
  };

  return (
    <div
      className="min-h-screen w-full bg-center flex items-center justify-center bg-cover relative"
      style={{ backgroundImage: "url('/tree_bg_pic.jpg')" }}
    >
      {/* Subtle overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Outer container */}
      <div className="relative flex flex-col w-full max-w-md mx-4 h-[90vh] max-h-[800px] bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl text-center overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-center bg-contain mb-3 shadow-md"
            style={{ backgroundImage: "url('/logo_3.png')" }}
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Trip Manali</h1>
          <p className="text-sm text-gray-600">Locked Pool Overview</p>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {summaryData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`flex items-center justify-center mb-2 text-${item.color}-500`}>
                <item.icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">₹{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Contributions List */}
        <div className="flex-1 flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Contributions
            </h2>
            <Edit2 className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {contributionsData.map((contrib) => (
              <div key={contrib.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">{contrib.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{contrib.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contrib.status)}`}>
                        ₹{contrib.amount.toLocaleString()}
                      </span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{getStatusText(contrib.status, contrib.date)}</span>
                    </div>
                  </div>
                </div>
                {contrib.status === 'unpaid' && (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Pay
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            <Minus className="w-4 h-4" />
            <span>Remove</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockedPool_1;