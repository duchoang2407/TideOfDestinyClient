import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Login Page</h1>
      <form className="flex flex-col gap-2 max-w-xs">
        <input type="text" placeholder="Username" className="border p-2" />
        <input type="password" placeholder="Password" className="border p-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
