import { useSelector } from 'react-redux';

import { MinusIcon, PlusIcon } from 'src/assets/icons';
import { Text } from 'src/components';
import { formatSum } from 'src/utils/common';

import styles from './TransactionTotal.module.scss';

const TransactionTotal = () => {
  const totalExpenses = useSelector((state) => state.transactions.totalExpenses);
  const totalIncome = useSelector((state) => state.transactions.totalIncome);
  return (
    <>
      <div className={styles.tableItem}>
        <Text size="s">Доход</Text>
        <div className={styles.totalWrapper}>
          <PlusIcon />
          <Text size="xl" weight={500} color="white">
            {!!Number(totalIncome) ? formatSum(totalIncome) : '0'}
          </Text>
        </div>
      </div>
      <div className={styles.tableItem}>
        <Text size="s">Расход</Text>
        <div className={styles.totalWrapper}>
          <MinusIcon />
          <Text size="xl" weight={500} color="white">
            {!!Number(totalExpenses) ? formatSum(totalExpenses) : '0'}
          </Text>
        </div>
      </div>
    </>
  );
};

export default TransactionTotal;
