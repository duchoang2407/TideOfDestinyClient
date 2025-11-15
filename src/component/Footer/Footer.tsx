import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assest/Logo 3.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b2239] text-gray-300 py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-16 w-auto scale-x-150" />
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-sm">
          <a href="#" className="hover:text-white transition">Điều khoản</a>
          <a href="#" className="hover:text-white transition">Chính sách</a>
          <a href="#" className="hover:text-white transition">Liên hệ</a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4 text-2xl">
          <a href="https://www.facebook.com/profile.php?id=61581944821089" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-red-500 transition" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="text-center text-xs mt-6">
        © 2025 Title Of Destiny | TIDEPOD
      </div>
    </footer>
  );
};

export default Footer;
