import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../lib/authStore";

const AdminRoute = () => {
    // same as ProtectedRoute: subscribed read, redirect during render, so a
    // non-admin never gets a frame of the admin pages
    const user = useAuthStore((s) => s.user);

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    if (user.role !== "admin") {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <Outlet />
    )
}

export default AdminRoute
