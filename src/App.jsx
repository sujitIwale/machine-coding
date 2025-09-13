import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/app/Layout/Layout';
import { routes } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Hello Welcome</div>} />
          {routes.map((route) => {
            if (route.versions?.length) {
              return route.versions?.map((subRoute) => (
                <Route
                  path={`/${route.path}/${subRoute.id}`}
                  Component={subRoute.component}
                />
              ));
            }
            return <Route path={route.path} Component={route.component} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
