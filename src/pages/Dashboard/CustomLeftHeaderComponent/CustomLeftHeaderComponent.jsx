import { Text } from 'src/components';

import styles from './CustomLeftHeaderComponent.module.scss';

const CustomLeftHeaderComponent = () => {
  return (
    <div className={styles.dashboardAvatarWrapper}>
      <div className={styles.dashboardAvatar}></div>
      <Text weight={400} lineHeight="150%" size="xxl" color="white">
        Привет,
      </Text>
    </div>
  );
};

export default CustomLeftHeaderComponent;
