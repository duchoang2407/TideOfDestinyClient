import women1 from "../../assest/women1.png";
import solder1 from "../../assest/solder1.png";

const LoginFooter = () => {
  return (
    // Container chính
    <div className="w-full bg-amber-800 relative">
      {/* Ảnh lính bên trái */}
      <img
        src={solder1}
        alt="Solder"
        className="absolute bottom-20  left-0 h-[300px] object-contain"
      />

      {/* Ảnh phụ nữ bên phải */}
      <img
        src={women1}
        alt="Women"
        className="absolute bottom-20 right-0 h-[520px] object-contain"
      />

      {/* Phần chữ chính giữa */}
      <div className="w-full max-w-7xl mx-auto  flex justify-between items-center text-yellow-300 font-bold text-6xl p-4">
        <span>VIỆT NAM</span>
        <span>1954 - 1975</span>
      </div>
    </div>
  );
};

export default LoginFooter;
