import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#0b2239] text-white">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">LOGO</div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/gameintroduction" className="hover:text-yellow-400">
              Giới thiệu game
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-yellow-400">
              Thông tin sự kiện
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400">
              Liên hệ
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-yellow-500 rounded">Log in</button>
          <button className="px-4 py-2 bg-blue-600 rounded">Tải game</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
