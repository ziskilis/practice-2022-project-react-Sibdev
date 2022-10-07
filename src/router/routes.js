import { PATHNAMES } from 'src/consts';
import { AimsPage, LoginPage, PocketsPage, RegisterPage } from 'src/pages';
import TempPage from 'src/pages/TempPage';

const authRoutes = [
  {
    path: PATHNAMES.aims,
    Component: <AimsPage />,
  },
  {
    path: PATHNAMES.pockets,
    Component: <PocketsPage />,
  },
  {
    path: '/',
    Component: <TempPage />,
  },
];

const publicRoutes = [
  {
    path: PATHNAMES.login,
    Component: <LoginPage />,
  },
  {
    path: PATHNAMES.register,
    Component: <RegisterPage />,
  },
];

export { authRoutes, publicRoutes };
