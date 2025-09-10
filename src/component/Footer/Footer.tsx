import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-6 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold">LOGO</div>
        <div className="flex space-x-6 my-4 md:my-0">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
        <div className="text-sm">© 2025 Title Of Destiny</div>
      </div>
    </footer>
  );
};

export default Footer;
