import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage.tsx";

import GameIntroductionPage from "./pages/GameIntroduction/GameIntroductionPage.tsx";
import SystemRequirementPage from "./pages/SystemRequirementPage.tsx";
import NewsPage from "./pages/News/NewsPage.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import NewsDetailPage from "./pages/News/NewsDetailPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import AdminHeader from "./component/Header/AdminHeader.tsx";
import AdminHomePage from "./pages/Admin/AdminHomePage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import các component cần bảo vệ
import PrivateRoute from "./component/PrivateRoute/PrivateRoute.tsx";

// Admin pages
import PlayerHome from "./pages/PlayerPage/PlayerHomePage.tsx";
import GameIntroduction from "./pages/Admin/AdminManager/GameIntroduction.js";
import UpdateInformation from "./pages/Admin/AdminManager/UpdateInformation.tsx"; // <- bạn cần tạo file này

const router = createBrowserRouter([
  // Route chính cho Player/User
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/gameintroduction", element: <GameIntroductionPage /> },
      { path: "/systemrequirements", element: <SystemRequirementPage /> },
      { path: "/newspage", element: <NewsPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/news/:version", element: <NewsDetailPage /> },
      { path: "/forgotpasswordpage", element: <ForgotPasswordPage /> },
      { path: "/registerpage", element: <RegisterPage /> },

      // Route cho Player
      {
        path: "/player/home",
        element: (
          <PrivateRoute role="Player">
            <PlayerHome />
          </PrivateRoute>
        ),
      },

      { path: "*", element: <Navigate to="/" /> },
    ],
  },

  // Route riêng cho Admin
  {
    path: "/admin",
    element: (
      <PrivateRoute role="Admin">
        <>
          <AdminHeader />
          <AdminHomePage />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/game",
    element: (
      <PrivateRoute role="Admin">
        <>
          <AdminHeader />
          <GameIntroduction />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/update",
    element: (
      <PrivateRoute role="Admin">
        <>
          <AdminHeader />
          <UpdateInformation />
        </>
      </PrivateRoute>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
