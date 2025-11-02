import React, { useEffect, useState } from "react";
import axiosInstance from "../../component/config/axiosConfig";

interface OrderItem {
  id: string;
  amount: number;
  createdAt: string;
  status: string;
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const loadOrders = async () => {
    try {
      const res = await axiosInstance.get("/Orders/history");
      setOrders(res.data);
    } catch (error) {
      console.error("❌ Error loading order history:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-5 text-gray-800">
        Lịch sử thanh toán
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có giao dịch nào.</p>
      ) : (
        <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Mã giao dịch</th>
              <th className="p-3">Số tiền</th>
              <th className="p-3">Ngày thanh toán</th>
              <th className="p-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.amount.toLocaleString()}₫</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    order.status === "Success"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryPage;
