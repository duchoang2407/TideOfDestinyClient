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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
        <h2 className="text-lg font-bold mb-4">Xác nhận xóa?</h2>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
