import React, { useEffect, useState } from "react";
import axiosInstance from "../../component/config/axiosConfig";
import { useSearchParams } from "react-router-dom";

const PaymentSuccessPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [params] = useSearchParams();

  useEffect(() => {
    const orderCode = params.get("orderCode");
    console.log("✅ Received orderCode:", orderCode);

    let interval: ReturnType<typeof setInterval>;

    const checkStatus = async () => {
      try {
        const orderCode = params.get("orderCode");
        if (!orderCode) return;

        console.log("📌 Confirming order:", orderCode);

        // ✅ Gọi confirm API để cập nhật trạng thái giao dịch
        await axiosInstance.post("/payment/confirm", Number(orderCode));

        // ✅ Kiểm tra trạng thái từ backend
        const res = await axiosInstance.get("/payment/purchase-status");
        const status = res.data.hasPurchased ?? res.data.HasPurchased;

        if (status) {
          setPurchased(true);
          clearInterval(interval);
          console.log("✅ Payment confirmed!");
        }
      } catch (err) {
        console.error("❌ Error confirming/checking status:", err);
      } finally {
        setLoading(false);
      }
    };

    // Poll mỗi 2s → tối đa 30s
    checkStatus();
    interval = setInterval(checkStatus, 2000);

    return () => clearInterval(interval);
  }, [params]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Đang xác nhận thanh toán...
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      {purchased ? (
        <>
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Thanh toán thành công 🎉
          </h2>
          <p>
            Bạn đã sở hữu <b>Tide of Destiny</b>!
          </p>
          <a
            href="/player/home"
            className="mt-6 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Quay lại trang người chơi
          </a>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Chưa xác nhận thanh toán ❌
          </h2>
          <p>Nếu bạn đã thanh toán, vui lòng chờ trong giây lát...</p>
        </>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
