import React from "react";

function LockConfirmPopup({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[85%] max-w-[400px] text-center">

        <h2 className="text-2xl font-semibold mb-3">Lock Pool?</h2>

        <p className="text-gray-700 mb-6 text-lg">
          Once locked, no further changes can be made to the locked pool.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full py-3 bg-gray-300 rounded-xl text-lg"
          >
            No, Don't Lock
          </button>

          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-500 text-white rounded-xl text-lg"
          >
            Yes, Lock
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockConfirmPopup;
