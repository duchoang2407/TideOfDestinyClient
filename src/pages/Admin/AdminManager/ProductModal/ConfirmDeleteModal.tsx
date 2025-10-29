import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-80 shadow-xl text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-xl font-bold text-red-600 mb-3">Xóa sản phẩm?</h2>
        <p className="mb-6 text-gray-600">Thao tác này không thể hoàn tác!</p>

        <div className="flex justify-center gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmDeleteModal;
