import { Outlet, useNavigate } from "react-router"
import './Layout.css'

const Layout = () => {
    const navigate = useNavigate()

    return <div>
        <header><button onClick={() => navigate('/')}>Back</button></header>
        <main className="main-container">
        <div>
            <Outlet />
        </div>
    </main>
    </div>
}

export default Layout