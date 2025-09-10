import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="w-full bg-gray-800 flex justify-between items-center px-8 py-4 text-white">
      <div className="text-2xl font-bold">LOGO</div>
      <ul className="flex space-x-6">
        <li>
          <a href="#" className="hover:text-yellow-400">
            Giới thiệu game
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            Thông tin sự kiện
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            Liên hệ
          </a>
        </li>
      </ul>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-yellow-500 rounded">Log in</button>
        <button className="px-4 py-2 bg-blue-600 rounded">Tải game</button>
      </div>
    </nav>
  );
};

export default Header;
