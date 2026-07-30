import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../lib/authStore";

const AdminRoute = () => {
    const role = useAuthStore((state) => state.user?.role);

    if (role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
