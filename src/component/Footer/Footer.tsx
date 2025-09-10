import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b2239] text-gray-300 py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Logo */}
        <div className="text-2xl font-bold">LOGO</div>

        {/* Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-sm">
          <a href="#">Điều khoản</a>
          <a href="#">Chính sách</a>
          <a href="#">Liên hệ</a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4">
          <a href="#">FB</a>
          <a href="#">TW</a>
          <a href="#">YT</a>
        </div>
      </div>

      <div className="text-center text-xs mt-6">
        © 2025 Title Of Destiny | TIDEPOD
      </div>
    </footer>
  );
};

export default Footer;
