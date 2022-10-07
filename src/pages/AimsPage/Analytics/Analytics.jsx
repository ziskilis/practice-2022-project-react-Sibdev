import { useSelector } from 'react-redux';

import { Box, Text } from 'src/components';
import { classnames } from 'src/utils';

import styles from './Analytics.module.scss';

const Analytics = () => {
  const analytics = useSelector((state) => state.aims.analytics);
  return (
    <div className={styles.analyticsWrapper}>
      <Box pb={18} ml={16}>
        <Text weight={700} as={'h3'} color={'white'} size={'l'}>
          Аналитика
        </Text>
      </Box>
      <div className={classnames([styles.analyticsItemWrapper, styles.mainItems])}>
        <div>Цели</div>
        <Text size={'xl'} weight={500} opacity={1} color={'white'}>
          {analytics?.open_target_count?.toString() || '0'}
        </Text>
      </div>
      <div className={classnames([styles.analyticsItemWrapper, styles.mainItems])}>
        <div>Средств на целях</div>
        <Text size={'xl'} weight={500} opacity={1} color={'white'}>
          {analytics?.open_target_total?.toString() || '0'}
        </Text>
      </div>
      <Box pt={14} pb={4}>
        <div className={styles.analyticsItemWrapper}>
          <div>Всего доход от %</div>
          <div>{analytics.all_time_percent}</div>
        </div>
        <div className={styles.analyticsItemWrapper}>
          <div>В этом месяце доход от %</div>
          <div>{analytics.current_month_percent}</div>
        </div>
        <div className={styles.analyticsItemWrapper}>
          <div>Ближайшая цель (дней)</div>
          <div>{analytics.nearest_end_target_days}</div>
        </div>
      </Box>
      <div className={styles.line}></div>
      <div className={styles.analyticsItemWrapper}>
        <div>Самая успешная категория</div>
        <div>{analytics.most_successful_category?.name || '-'}</div>
      </div>
      <div className={styles.analyticsItemWrapper}>
        <div>Самая популярная категория</div>
        <div>{analytics.most_popular_category?.name || '-'}</div>
      </div>
    </div>
  );
};

export default Analytics;
