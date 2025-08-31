import { Link } from "react-router";
import { routes } from "../constants/routes";

const HomePage = () => {
  return (
    <div>
      <h2>Find all components here</h2>
      {routes.map((route) => (
        <div>
          <Link to={route.route}>{route.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
