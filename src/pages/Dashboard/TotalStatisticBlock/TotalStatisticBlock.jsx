import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getQuote } from 'src/api/requests';
import { Text } from 'src/components';
import TransactionTotal from 'src/pages/Pockets/CommonInformation/TransactionsSection/TransactionTotal';
import { getAnalytics } from 'src/store/slices/aimsActions';
import { getCategories } from 'src/store/slices/categoriesSlice';
import { getTotalAmounts } from 'src/store/slices/transactionsSlice';

import styles from './TotalStatisticBlock.module.scss';

const TotalStatisticBlock = () => {
  const dispatch = useDispatch();
  const [date] = useState(() => new Date());
  const [quote, setQuote] = useState('');
  let topSpending = useSelector((state) => state.categories.list?.[0]?.name);
  const analytics = useSelector((state) => state.aims.analytics);

  if (topSpending?.length && topSpending.length > 10) {
    topSpending = topSpending.slice(0, 7) + '...';
  }

  useEffect(() => {
    dispatch(getCategories([date.getMonth() + 1, date.getFullYear()]));
    dispatch(getTotalAmounts([date.getMonth() + 1, date.getFullYear()]));
    dispatch(getAnalytics());
    getQuote().then((res) => setQuote(res.text));
  }, [dispatch, date]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>
        <Text color={'white'} size={'l'} weight={700}>
          {date.toLocaleDateString('ru-RU', {
            month: 'long',
          })}
        </Text>
        <Text color={'white'} size={'l'} weight={400} lineHeight="150%">
          {date.toLocaleDateString('ru-RU', {
            year: 'numeric',
          })}
        </Text>
      </div>
      <TransactionTotal />
      <div className={styles.analyticsBlockWrapper}>
        <div className={styles.analyticsItemWrapper}>
          <Text weight={400} size="xs" lineHeight="150%" color="white" opacity={0.5}>
            Отложено на цели
          </Text>
          <Text weight={400} size="s" lineHeight="150%" opacity={0.8}>
            {analytics?.open_target_total?.toString() || '0'}
          </Text>
        </div>
        <div className={styles.analyticsItemWrapper}>
          <Text weight={400} size="xs" lineHeight="150%" color="white" opacity={0.5}>
            Больше всего расходов
          </Text>
          <Text weight={400} size="s" lineHeight="150%" opacity={0.8}>
            {topSpending || '-'}
          </Text>
        </div>
      </div>
      <div className={styles.quoteWrapper}>
        <Text weight={300} lineHeight="150%" color="brand" size="xl" align="center">
          {quote}
        </Text>
      </div>
    </div>
  );
};

export default TotalStatisticBlock;
