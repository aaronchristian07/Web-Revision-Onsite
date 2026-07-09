import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Shop from "./pages/auth/Shop";
import Cart from "./pages/auth/Cart";
import History from "./pages/auth/History";

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
        element: <Shop />  // --> child element
      },
      {
        path: "cart",
        element: <Cart />  // --> child element
      },
      {
        path: "history",
        element: <History />  // --> child element
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