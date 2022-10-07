import { Text } from 'src/components';

import styles from './Notification.module.scss';

const Notification = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <Text color="contrast">{text}</Text>
    </div>
  );
};

export default Notification;
