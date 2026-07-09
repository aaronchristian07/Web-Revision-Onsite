import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AuthLayout from "./pages/auth/AuthLayout";

// router.tsx
const router = createBrowserRouter([
  {
	  // automatically navigate to auth/login
    path: "/",  
    element: <Navigate to="/auth/login" replace />,
  },
  {
	  // always use AuthLayout if URL begins with "/auth"
    path: "/auth",
    element: <AuthLayout/>,  // --> parent element
    children: [  // insert child element into parent's <Outlet />
      {
        path: "login",
        element: <LoginPage />  // --> child element
      },
    ]
  },
  {
	  // always use AuthLayout if URL begins with "/auth"
    path: "/auth",
    element: <AuthLayout/>,  // --> parent element
    children: [  // insert child element into parent's <Outlet />
      {
        path: "register",
        element: <RegisterPage />  // --> child element
      },
    ]
  },
  {
	  // for every URL, go to ProtectedRoute (ex: /dashboard, /profile)
	  // SET THIS BLOCK AFTER AUTH so that auth does not use ProtectedRoute
    element: <ProtectedRoute />,
    children: [
    //   {
	//       ...
    //   },
    ]
  },
]);

export default router;