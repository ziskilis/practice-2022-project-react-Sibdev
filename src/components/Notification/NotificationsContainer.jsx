import { useState, useEffect } from 'react';

import Notification from './Notification';

//TODO доделать механизм нотификаций

let currentNotifications = [];

const checkUpdate = (curr, prev) => {
  if (curr.some((item) => !prev.includes(item))) return true;
  if (prev.some((item) => !curr.includes(item))) return true;
  return false;
};

/**
 *
 * @param {*} callback
 * @returns {Function} возвращает функцию очистки интервала
 *
 * Служит для запуска проверки изменений массива нотификаций
 */
const getNotifications = (callback) => {
  let prevNotifications = [];

  const interval = setInterval(() => {
    if (checkUpdate(currentNotifications, prevNotifications)) {
      prevNotifications = [...currentNotifications];
      callback([...currentNotifications]);
    }
  }, 500);
  return () => clearInterval(interval);
};

export const addToSub = (text) => {
  currentNotifications.push(text);
};

const NotificationsContainer = () => {
  const [notifications, setNewNotifications] = useState([]);

  useEffect(() => {
    const closeSubscription = getNotifications((newNotif) => setNewNotifications(newNotif));
    return closeSubscription;
  }, []);

  return notifications.map((notification) => <Notification key={notification.id} text={notification} />);
};

export default NotificationsContainer;
