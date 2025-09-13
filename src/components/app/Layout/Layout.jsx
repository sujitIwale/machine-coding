import { Outlet } from 'react-router-dom';
import './Layout.css';
import SideBar from './Sidebar/Sidebar';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      {/* <aside className="sidebar">
        <h2 className="logo">MyApp</h2>
        <nav className="nav">
          <a href="#">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </nav>
      </aside> */}

      <SideBar />

      {/* Main Content */}
      <div className="main">
        {/* Header */}
        {/* <header className="header">
          <h1>Welcome</h1>
          <div className="user">👤 User</div>
        </header> */}

        {/* Page Content */}
        <Suspense fallback={<div className="loading">Loading content...</div>}>
          <div className="content">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
