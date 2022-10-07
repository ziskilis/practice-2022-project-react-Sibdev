import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Text } from 'src/components';
import { getCategories } from 'src/store/slices/categoriesActions';
import { getTotalAmounts } from 'src/store/slices/transactionsSlice';

import CategoriesTable from '../CategoriesTable';
import CommonInformation from '../CommonInformation';

import styles from './Statistic.module.scss';

const Statistic = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalAmounts([date.getMonth() + 1, date.getFullYear()]));
    dispatch(getCategories([date.getMonth() + 1, date.getFullYear()]));
  }, [date, dispatch]);

  return (
    <div className={styles.statisticWrapper}>
      <div className={styles.statisticTextWrapper}>
        <Text weight={700} size="l" color={'white'}>
          статистика
        </Text>
        <div className={styles.buttonBlock}>
          <div className={styles.monthWrapper}>
            <Button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))} width={16} height={16}>
              <Text color={'brand'} size={'m'} weight={700}>
                &lt;
              </Text>
            </Button>
            {date.toLocaleDateString('ru-RU', {
              month: 'long',
            })}
            <Button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))} width={16} height={16}>
              <Text color={'brand'} size={'m'} weight={700}>
                &gt;
              </Text>
            </Button>
          </div>
          <div className={styles.yearWrapper}>
            <Button onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() - 1)))} width={16} height={16}>
              <Text color={'brand'} size={'m'} weight={700}>
                &lt;
              </Text>
            </Button>
            {date.getFullYear()}
            <Button onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() + 1)))} width={16} height={16}>
              <Text color={'brand'} size={'m'} weight={700}>
                &gt;
              </Text>
            </Button>
          </div>
        </div>
      </div>
      <CommonInformation />
      <CategoriesTable />
    </div>
  );
};

export default Statistic;
