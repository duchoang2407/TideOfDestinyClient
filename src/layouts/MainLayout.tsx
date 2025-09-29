import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import LoginModal from "../pages/Login/LoginModal";
import RegisterModal from "../pages/RegisterPage/RegisterModal";
import ForgotPasswordModal from "../pages/ForgotPasswordPage/ForgotPasswordModal";

const MainLayout: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotOpen, setForgotOpen] = useState(false);

  return (
    <>
      {/* Header nhận prop openLogin */}
      <Header openLogin={() => setLoginOpen(true)} />

      {/* Route con */}
      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onOpenForgotPassword={() => {
          setLoginOpen(false);
          setForgotOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setForgotOpen(false)}
        onOpenLogin={() => {
          setForgotOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};

export default MainLayout;
