import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#fff4e6] to-[#ffe4c4] border border-[#d9b778]/30 rounded-2xl p-6 w-[360px] shadow-xl shadow-black/10 animate-scaleUp">
        <h2 className="text-xl font-bold text-[#1a2a3d] text-center mb-3">
          Confirm Delete
        </h2>
        <p className="text-center text-[#333] mb-6">
          Are you sure you want to delete this article?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
