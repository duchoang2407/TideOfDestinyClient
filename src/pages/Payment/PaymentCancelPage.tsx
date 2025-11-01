import React from "react";
import { Link } from "react-router-dom";

const PaymentCancelPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Giao dịch đã bị hủy ❌
      </h2>
      <p>Bạn chưa bị trừ tiền. Hãy thử lại nếu muốn mua game.</p>
      <Link
        to="/purchase"
        className="mt-6 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
      >
        Mua lại
      </Link>
    </div>
  );
};

export default PaymentCancelPage;
