import React from "react";

function DeleteConfirmPopup({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[85%] max-w-[400px] text-center">

        <h2 className="text-2xl font-semibold mb-3 text-red-600">Delete Pool?</h2>

        <p className="text-gray-700 mb-6 text-lg">
          This action <strong>cannot be undone.</strong><br />
          All pool data and settlements will be permanently deleted.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full py-3 bg-gray-300 rounded-xl text-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-600 text-white rounded-xl text-lg"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmPopup;
