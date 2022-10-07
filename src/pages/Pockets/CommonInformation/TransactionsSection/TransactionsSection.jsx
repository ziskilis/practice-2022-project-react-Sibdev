import { Box, Text } from 'src/components';

import PieChart from './PieChart';
import styles from './TransactionsSection.module.scss';
import TransactionTotal from './TransactionTotal';

const TransactionsSection = () => {
  return (
    <div className={styles.wrapper}>
      <Box ml={16} mb={20}>
        <Text size="xs" weight={400}>
          Общее
        </Text>
      </Box>
      <TransactionTotal />
      <div className={styles.dashboard}>
        <PieChart />
      </div>
    </div>
  );
};

export default TransactionsSection;
