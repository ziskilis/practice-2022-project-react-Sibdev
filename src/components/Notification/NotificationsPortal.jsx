import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import NotificationsContainer from './NotificationsContainer';

const NotificationsPortal = () => {
  const containerRef = useRef(document.createElement('div'));

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return undefined;

    document.body.appendChild(current);

    return () => current.remove();
  }, []);

  return createPortal(<NotificationsContainer />, containerRef.current);
};

export default NotificationsPortal;
