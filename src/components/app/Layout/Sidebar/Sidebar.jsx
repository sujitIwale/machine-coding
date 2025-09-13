import { Link } from 'react-router-dom';
import { routes } from '../../../../constants/routes';
import './Sidebar.css';
import { useEffect, useRef, useState } from 'react';

const minWidth = 240;

const SideBar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(minWidth);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = Math.max(minWidth, e.clientX); // minimum 150px
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // prevent text selection
  };

  return (
    <aside className="sidebar" style={{ width: `${sidebarWidth}px` }}>
      <h2 className="logo">Sujit Iwale</h2>
      <nav className="nav">
        {routes.map((route) => {
          return route.versions?.length ? (
            route.versions.map((subRoute) => (
              <Link to={`/${route.path}/${subRoute.id}`}>{subRoute.name}</Link>
            ))
          ) : (
            <Link to={route.path}>{route.name}</Link>
          );
        })}
      </nav>

      <div className="resizer" onMouseDown={startResizing} />
    </aside>
  );
};

export default SideBar;
