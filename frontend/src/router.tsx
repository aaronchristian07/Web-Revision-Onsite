import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import IceCreamManagement from "./pages/admin/IceCreamManagement";
import TransactionManagement from "./pages/admin/TransactionManagement";
import Layout from "./components/Layout";
import { ADMIN_NAV_ITEMS, ADMIN_PAGE_HEADERS } from "./lib/navConfig";

// router.tsx
const router = createBrowserRouter([
  {
	  path: "/",
    element: <LandingPage />,
  },
  {
	  path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />  // --> child element
      },
      {
        path: "register",
        element: <RegisterPage />  // --> child element
      },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />  // --> child element
          },
          {
            path: "order",
            element: <Order />  // --> child element
          },
          {
            path: "cart",
            element: <Cart />  // --> child element
          },
          {
            path: "profile",
            element: <ProfilePage />  // --> child element
          },
        ]
      },
      {
        element: <AdminRoute />,
        children: [{
          element: <Layout navItems={ADMIN_NAV_ITEMS} pageHeaders={ADMIN_PAGE_HEADERS} />,
          children: [
            {
              path: "admin",
              element: <Navigate to="/admin/dashboard" replace />
            },
            {
              path: "admin/dashboard",
              element: <AdminDashboard />
            },
            {
              path: "admin/ice-cream",
              element: <IceCreamManagement />
            },
            {
              path: "admin/transactions",
              element: <TransactionManagement />
            },
          ]
        }]
      },
    ]
  },
]);

export default router;
