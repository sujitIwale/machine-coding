import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import './Sidebar.css';

const SideBar = ({ width }) => {
  return (
    <aside className="sidebar" style={{ width: `${width}%` }}>
      <nav>
        {routes.map((route) => (
          <div key={route.route}>
            {route.versions?.length ? (
              route.versions.map((subRoute) => (
                <Link to={`/${route.path}/${subRoute.id}`}>
                  {subRoute.name}
                </Link>
              ))
            ) : (
              <Link to={route.path}>{route.name}</Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
