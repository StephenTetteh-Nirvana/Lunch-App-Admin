import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null

    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes