import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { storage } from 'src/api';
import { logoutObserver } from 'src/api/observers';
import { PATHNAMES } from 'src/consts';
import { useLogout } from 'src/hooks';

const ProtectedRoute = () => {
  const auth = storage.GET('refresh');
  const handleLogout = useLogout();
  useEffect(() => {
    if (!auth) {
      return;
    }
    const subId = logoutObserver.subscribe(handleLogout);
    return () => logoutObserver.unsubscribe(subId);
  }, [handleLogout, auth]);

  return auth ? <Outlet /> : <Navigate to={PATHNAMES.login} />;
};

export default ProtectedRoute;
