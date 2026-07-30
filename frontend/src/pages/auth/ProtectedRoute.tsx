import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../lib/authStore";

const ProtectedRoute = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    if (!accessToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
