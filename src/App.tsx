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

const router = createBrowserRouter([
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
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
