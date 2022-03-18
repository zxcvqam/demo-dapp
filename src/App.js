import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// routes
import { AppRoutes } from './routes';

const MainLayout = lazy(() => import('./layouts/MainLayout'));

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Switch>
          {AppRoutes.map((route) => {
            const { component: Component, path, exact } = route;
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => {
                  return (
                    <MainLayout>
                      <Component {...props} />
                    </MainLayout>
                  );
                }}
              />
            );
          })}

          <Redirect from="*" to="/error-404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
