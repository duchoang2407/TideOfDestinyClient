import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  openLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ openLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  // 🔹 Khi cuộn chuột, đổi trạng thái header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // cuộn > 20px thì kích hoạt hiệu ứng
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { name: "Giới thiệu game", path: "/gameintroduction" },
    { name: "Thông tin cập nhật", path: "/newspage" },
    { name: "Liên hệ Hỗ trợ", path: "/contact" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-[#0b2239]/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b border-white/10"
            : "bg-[#0b2239]/40 "
        }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white transition-all duration-500">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-[#aef4ff] transition-all"
          >
            LOGO
          </Link>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-10 font-medium relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.path}
                className="relative group transition-all duration-300"
              >
                <Link
                  to={item.path}
                  className={`pb-2 transition-colors duration-300 ${
                    isActive
                      ? "text-[#aef4ff]"
                      : "text-gray-200 hover:text-[#aef4ff]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Thanh hover / active */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] rounded-full bg-[#7fe5ff] transition-all duration-300 
                    ${
                      isActive
                        ? "w-10 opacity-100"
                        : "w-0 group-hover:w-10 opacity-100"
                    }`}
                ></span>
              </li>
            );
          })}
        </ul>

        {/* Buttons */}
        <div className="flex space-x-3 items-center">
          {!token ? (
            <>
              <button
                onClick={openLogin}
                className="px-4 py-2 bg-gradient-to-r from-[#ffd54f] to-[#ffb300] rounded font-semibold hover:brightness-110 transition-all"
              >
                Log in
              </button>
              <a href="/systemrequirements">
                <button className="px-4 py-2 bg-gradient-to-r from-[#2196f3] to-[#1565c0] rounded text-white font-bold hover:brightness-110 transition-all">
                  Tải game
                </button>
              </a>
            </>
          ) : (
            <>
              <span className="italic">
                Xin chào, <b>{username || "User"}</b>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-[#ef5350] to-[#c62828] rounded hover:brightness-110 transition-all"
              >
                Đăng xuất
              </button>
              <a href="/systemrequirements">
                <button className="px-4 py-2 bg-gradient-to-r from-[#2196f3] to-[#1565c0] rounded text-white font-bold hover:brightness-110 transition-all">
                  Tải game
                </button>
              </a>
              {role === "Admin" && (
                <Link to="/admin/dashboard">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#43a047] to-[#2e7d32] rounded hover:brightness-110 transition-all">
                    Quản lý
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
