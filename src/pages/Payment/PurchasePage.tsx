import React, { useEffect, useState } from "react";
import axiosInstance from "../../component/config/axiosConfig";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
}

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // ✅ Lấy thông tin sản phẩm chính (game)
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/main");
      setProduct(res.data);
    } catch (err) {
      console.error("❌ Error loading product:", err);
    }
  };

  // ✅ Kiểm tra xem user đã mua game chưa
  const fetchPurchaseStatus = async () => {
    try {
      const res = await axiosInstance.get("/payment/purchase-status");
      setHasPurchased(res.data.hasPurchased ?? res.data.HasPurchased);
    } catch (err) {
      console.error("❌ Error checking purchase status:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchPurchaseStatus();
  }, []);

  // ✅ Gọi API tạo link thanh toán
  const handleBuy = async () => {
    try {
      setLoading(true);

      if (!product?.id) {
        alert("Không tìm thấy sản phẩm để thanh toán!");
        return;
      }

      const res = await axiosInstance.post("/payment/create-payment-link", {
        productId: product.id,
        amount: product.price, // ❓ nếu backend yêu cầu số tiền
        returnUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      window.location.href = res.data.checkoutUrl;
    } catch (err: any) {
      console.error("❌ Payment error:", err.response?.data);

      if (err.response?.status === 401) {
        alert("Bạn cần đăng nhập để mua game.");
        navigate("/login");
        return;
      }

      if (err.response?.status === 409) {
        alert("Bạn đã mua game rồi!");
        setHasPurchased(true);
        return;
      }

      alert(err.response?.data?.message ?? "Lỗi khi tạo link thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-96 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {product?.name ?? "Tide of Destiny"}
        </h2>

        <p className="text-gray-600 mb-6 text-lg">
          Giá:{" "}
          <b className="text-green-700">
            {product?.price ? product.price.toLocaleString() : "—"}₫
          </b>
        </p>

        {hasPurchased ? (
          <p className="text-green-600 font-semibold text-lg">
            ✅ Bạn đã mua game này rồi.
          </p>
        ) : (
          <button
            onClick={handleBuy}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-3 rounded-lg font-semibold transition`}
          >
            {loading ? "Đang tạo link..." : "Thanh toán ngay"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchasePage;
