import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage";

import GameIntroductionPage from "./pages/GameIntroduction/GameIntroductionPage.tsx";
import SystemRequirementPage from "./pages/SystemRequirementPage.tsx";
import NewsPage from "./pages/News/NewsPage.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import NewsDetailPage from "./pages/News/NewsDetailPage.tsx";

import AdminHeader from "./component/Header/AdminHeader.tsx";
import AdminHomePage from "./pages/Admin/AdminHomePage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PrivateRoute from "./component/PrivateRoute/PrivateRoute.tsx";

// Admin pages
import PlayerHome from "./pages/PlayerPage/PlayerHomePage.tsx";
import GameIntroduction from "./pages/Admin/AdminManager/GameIntroduction.js";
import UpdateInformation from "./pages/Admin/AdminManager/UpdateInformation.tsx";

// Các modal
import LoginModal from "./pages/Login/LoginModal.tsx";
import RegisterModal from "./pages/RegisterPage/RegisterModal.tsx";
import ForgotPasswordModal from "./pages/ForgotPasswordPage/ForgotPasswordModal.tsx";
import GameIntroductionDetailPage from "./pages/GameIntroduction/GameIntroductionDetailPage.tsx";

const App: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotOpen, setForgotOpen] = useState(false);

  return (
    <GoogleOAuthProvider clientId="467475853265-i7sdj6otkta2r2o6mpbe1lc8rosea8ep.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* User routes */}
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

            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          {/* Admin routes */}
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
        </Routes>

        {/* ✅ Modals nằm trong BrowserRouter, nên dùng được useNavigate */}
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
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
