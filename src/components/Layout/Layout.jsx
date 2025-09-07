import { Outlet } from 'react-router-dom';
import './Layout.css';
import SideBar from './Sidebar/Sidebar';
import { Suspense, useState } from 'react';

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(30);

  return (
    <div className="layout">
      {/* <header>
        <button onClick={() => navigate('/')}>Back</button>
      </header> */}
      <SideBar width={sidebarWidth} />
      <main className="main-container">
        <Suspense fallback={<div className="loading">Loading content...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
