import { Outlet, useNavigate } from "react-router"

const Layout = () => {
    const navigate = useNavigate()
    return <div>
        <button onClick={() => navigate('/')}>Back</button>
        <div>
            <Outlet />
        </div>
    </div>
}

export default Layout