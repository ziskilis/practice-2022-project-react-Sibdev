import { AddIcon } from 'src/assets/icons';
import { Box, Text } from 'src/components';

import styles from './EmptyList.module.scss';

const EmptyList = ({ text, height = '100%', bgColor, onClick }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        height,
        backgroundColor: bgColor,
      }}
    >
      <button className={styles.button} onClick={onClick}>
        <AddIcon />
        <Box ml={8}>
          <Text size="xl" weight={500} color="brand">
            {text}
          </Text>
        </Box>
      </button>
    </div>
  );
};

export default EmptyList;
