import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../lib/authStore"

const ProtectedRoute = () => {
    // subscribe rather than getState() so a logout anywhere re-renders this
    // guard, and decide during render so children never mount unauthenticated
    const accessToken = useAuthStore((s) => s.accessToken)

    if (!accessToken) {
        return <Navigate to="/auth/login" replace />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
