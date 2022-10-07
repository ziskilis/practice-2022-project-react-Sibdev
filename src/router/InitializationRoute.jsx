import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { logoutObserver } from 'src/api/observers';
import { useLogout } from 'src/hooks';

const InitializationRoute = () => {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isInit) return;
    navigate('/');
    setIsInit(true);
  }, [navigate, isInit]);

  useEffect(() => {
    const subId = logoutObserver.subscribe(handleLogout);
    return () => logoutObserver.unsubscribe(subId);
  }, [handleLogout]);

  return isInit ? <Outlet /> : <h1>тут будет прелоадер</h1>; //TODO
};

export default InitializationRoute;
