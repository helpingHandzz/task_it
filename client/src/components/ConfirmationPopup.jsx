import React from 'react'

export default function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 m-0 p-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg mb-4">Are you sure you want to delete this availability?</h2>
          <div className="flex justify-between">
            <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
  )
};
