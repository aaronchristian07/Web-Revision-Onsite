import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { useAuthStore } from "../../lib/authStore"

const ProtectedRoute = () => {
    const logout = useAuthStore((s) => s.logout);
    const accessToken = useAuthStore.getState().accessToken
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            logout()
            navigate("/auth/login")
        }
            
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoute