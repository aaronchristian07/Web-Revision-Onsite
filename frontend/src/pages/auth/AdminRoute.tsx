import { Outlet } from "react-router"

const AdminRoute = () => {
    // TODO: fase auth nyata — cek role dari authStore/JWT, redirect kalau bukan admin.
    return (
        <Outlet />
    )
}

export default AdminRoute
