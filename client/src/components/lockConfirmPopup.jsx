import React from "react";
import { Lock, AlertTriangle } from "lucide-react";

function LockConfirmPopup({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Dark Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-[30px] shadow-2xl w-full max-w-sm p-6 text-center border border-white/50 transform transition-all scale-100">
        
        {/* Warning Icon Container */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-5 shadow-inner">
          <Lock className="w-8 h-8 text-red-500" />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Lock this Pool?
        </h2>

        <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-6">
            <div className="flex items-start justify-center gap-2 text-red-600 text-sm font-medium">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <p className="text-left leading-tight">
                    This action is permanent. You cannot add or remove users after locking.
                </p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-xl text-white font-bold 
            bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
            shadow-lg shadow-red-500/30 transition-all transform active:scale-95"
          >
            Yes, Lock It
          </button>
        </div>

      </div>
    </div>
  );
}

export default LockConfirmPopup;