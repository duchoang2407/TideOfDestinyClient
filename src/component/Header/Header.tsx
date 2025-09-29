// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Header: React.FC = () => {
//   const navigate = useNavigate();

//   // Lấy token và role từ localStorage
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const username = localStorage.getItem("username"); // mình lưu thêm khi login

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   return (
//     <header className="w-full bg-[#0b2239] text-white">
//       <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//         {/* Logo */}
//         <div>
//           <Link to="/" className="text-2xl font-bold">
//             LOGO
//           </Link>
//         </div>

//         {/* Menu */}
//         <ul className="hidden md:flex space-x-8 font-medium">
//           <li>
//             <Link to="/gameintroduction" className="hover:text-yellow-400">
//               Giới thiệu game
//             </Link>
//           </li>
//           <li>
//             <Link to="/newspage" className="hover:text-yellow-400">
//               Thông tin cập nhật
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:text-yellow-400">
//               Liên hệ Hỗ trợ
//             </Link>
//           </li>
//         </ul>

//         {/* Buttons */}
//         <div className="flex space-x-3 items-center">
//           {!token ? (
//             // Nếu chưa login
//             <>
//               <Link to="/login">
//                 <button className="px-4 py-2 bg-yellow-500 rounded">
//                   Log in
//                 </button>
//               </Link>
//               <a href="/systemrequirements">
//                 <button className="px-4 py-2 bg-blue-600 rounded text-white font-bold">
//                   Tải game
//                 </button>
//               </a>
//             </>
//           ) : (
//             // Nếu đã login
//             <>
//               <span className="italic">
//                 Xin chào, <b>{username || "User"}</b>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-600 rounded"
//               >
//                 Đăng xuất
//               </button>
//               <a href="/systemrequirements">
//                 <button className="px-4 py-2 bg-blue-600 rounded text-white font-bold">
//                   Tải game
//                 </button>
//               </a>
//               {role === "Admin" && (
//                 <Link to="/admin/dashboard">
//                   <button className="px-4 py-2 bg-green-600 rounded">
//                     Quản lý
//                   </button>
//                 </Link>
//               )}
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  openLogin: () => void; // bắt buộc truyền vào
}

const Header: React.FC<HeaderProps> = ({ openLogin }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload(); // để cập nhật header sau logout
  };

  return (
    <header className="w-full bg-[#0b2239] text-white">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold">
            LOGO
          </Link>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/gameintroduction" className="hover:text-yellow-400">
              Giới thiệu game
            </Link>
          </li>
          <li>
            <Link to="/newspage" className="hover:text-yellow-400">
              Thông tin cập nhật
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400">
              Liên hệ Hỗ trợ
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex space-x-3 items-center">
          {!token ? (
            <>
              <button
                onClick={openLogin}
                className="px-4 py-2 bg-yellow-500 rounded"
              >
                Log in
              </button>
              <a href="/systemrequirements">
                <button className="px-4 py-2 bg-blue-600 rounded text-white font-bold">
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
                className="px-4 py-2 bg-red-600 rounded"
              >
                Đăng xuất
              </button>
              <a href="/systemrequirements">
                <button className="px-4 py-2 bg-blue-600 rounded text-white font-bold">
                  Tải game
                </button>
              </a>
              {role === "Admin" && (
                <Link to="/admin/dashboard">
                  <button className="px-4 py-2 bg-green-600 rounded">
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
