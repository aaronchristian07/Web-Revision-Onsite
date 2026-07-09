import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";

// router.tsx
const router = createBrowserRouter([
  {
	  path: "/",  
    element: <Navigate to="/auth/login" replace />,
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
      {
        path: "dashboard",
        element: <Dashboard />  // --> child element
      },
      {
        path: "cart",
        element: <Cart />  // --> child element
      },
      {
        path: "history",
        element: <History />  // --> child element
      },
      {
        path: "profile",
        element: <ProfilePage />  // --> child element
      },
    ]
  },
  {
    // for every URL, go to ProtectedRoute (ex: /dashboard, /profile)
    // SET THIS BLOCK AFTER AUTH so that auth does not use ProtectedRoute
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />  // --> child element
      }
    ]
  },
]);

export default router;