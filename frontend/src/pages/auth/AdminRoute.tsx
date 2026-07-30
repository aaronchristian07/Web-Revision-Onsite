import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"
import { useAuthStore } from "../../lib/authStore";

const AdminRoute = () => {
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore.getState().user
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            logout()
            navigate("/auth/login")
            return
        }
        if (user.role != "admin") {
            navigate("/dashboard")
            return
        }
    }, [])

    return (
        <Outlet />
    )
}

export default AdminRoute
