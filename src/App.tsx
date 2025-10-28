import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "./layouts/MainLayout.tsx";
import CustomCursor from "./component/Cursor/CustomCursor.tsx";

import HomePage from "./pages/HomePage";
import GameIntroductionPage from "./pages/GameIntroduction/GameIntroductionPage.tsx";
import SystemRequirementPage from "./pages/SystemRequirementPage.tsx";
import NewsPage from "./pages/News/NewsPage.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import NewsDetailPage from "./pages/News/NewsDetailPage.tsx";
import GameIntroductionDetailPage from "./pages/GameIntroduction/GameIntroductionDetailPage.tsx";

import AdminHeader from "./component/Header/AdminHeader.tsx";
import AdminHomePage from "./pages/Admin/AdminHomePage.tsx";
import GameIntroduction from "./pages/Admin/AdminManager/GameIntroduction.js";
import UpdateInformation from "./pages/Admin/AdminManager/UpdateInformation.tsx";
import UploadGameFile from "./pages/Admin/AdminManager/UploadGameFile.tsx";

import PrivateRoute from "./component/PrivateRoute/PrivateRoute.tsx";
import PlayerHome from "./pages/PlayerPage/PlayerHomePage.tsx";

import LoginModal from "./pages/Login/LoginModal.tsx";
import RegisterModal from "./pages/RegisterPage/RegisterModal.tsx";
import ForgotPasswordModal from "./pages/ForgotPasswordPage/ForgotPasswordModal.tsx";

// 🪙 Import các trang thanh toán (mới thêm)
import PurchasePage from "./pages/Payment/PurchasePage.tsx";
import PaymentSuccessPage from "./pages/Payment/PaymentSuccessPage.tsx";
import PaymentCancelPage from "./pages/Payment/PaymentCancelPage.tsx";

const App: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotOpen, setForgotOpen] = useState(false);

  return (
    <GoogleOAuthProvider clientId="467475853265-i7sdj6otkta2r2o6mpbe1lc8rosea8ep.apps.googleusercontent.com">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          {/* --- USER ROUTES --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="gameintroduction" element={<GameIntroductionPage />} />
            <Route
              path="systemrequirements"
              element={<SystemRequirementPage />}
            />
            <Route path="newspage" element={<NewsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="news/:version" element={<NewsDetailPage />} />
            <Route
              path="game-introduction/:id"
              element={<GameIntroductionDetailPage />}
            />
            <Route
              path="player/home"
              element={
                <PrivateRoute role="Player">
                  <PlayerHome />
                </PrivateRoute>
              }
            />

            {/* 🪙 ROUTES THANH TOÁN */}
            <Route
              path="purchase"
              element={
                <PrivateRoute>
                  <PurchasePage />
                </PrivateRoute>
              }
            />

            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="payment-cancel" element={<PaymentCancelPage />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          {/* --- ADMIN ROUTES --- */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="Admin">
                <>
                  <AdminHeader />
                  <AdminHomePage />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/game"
            element={
              <PrivateRoute role="Admin">
                <>
                  <AdminHeader />
                  <GameIntroduction />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/update"
            element={
              <PrivateRoute role="Admin">
                <>
                  <AdminHeader />
                  <UpdateInformation />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/upload"
            element={
              <PrivateRoute role="Admin">
                <>
                  <AdminHeader />
                  <UploadGameFile />
                </>
              </PrivateRoute>
            }
          />
        </Routes>

        {/* --- MODALS --- */}
        {isLoginOpen && (
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
        )}

        {isRegisterOpen && (
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setRegisterOpen(false)}
            onOpenLogin={() => {
              setRegisterOpen(false);
              setLoginOpen(true);
            }}
          />
        )}

        {isForgotOpen && (
          <ForgotPasswordModal
            isOpen={isForgotOpen}
            onClose={() => setForgotOpen(false)}
            onOpenLogin={() => {
              setForgotOpen(false);
              setLoginOpen(true);
            }}
          />
        )}
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
