import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { PATHNAMES } from 'src/consts';
import { LoginPage, RegisterPage, PocketsPage } from 'src/pages';
import AimsPage from 'src/pages/AimsPage';
import Dashboard from 'src/pages/Dashboard';

import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path={PATHNAMES.dashboard} element={<Dashboard />} />
        <Route path={PATHNAMES.pockets} element={<PocketsPage />} />
        <Route path={PATHNAMES.aims} element={<AimsPage />} />
        <Route exact path="/" element={<Navigate to={PATHNAMES.dashboard} />} />
      </Route>
      <Route path={PATHNAMES.login} element={<LoginPage />} />
      <Route path={PATHNAMES.register} element={<RegisterPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
