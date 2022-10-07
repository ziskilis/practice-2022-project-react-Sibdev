import { DoneChartIcon, ProgressChartIcon } from 'src/assets/icons';
import { Box, Text } from 'src/components';
import { formatSum } from 'src/utils/common';

import AimsProgress from '../../AimsProgress';

import styles from './AimProgressBlock.module.scss';

const AimProgressBlock = ({ item, isClosed = false }) => {
  const isDone = item.total_amount / item.amount >= 1;
  return (
    <div className={styles.progressBlockWrapper}>
      <div className={styles.progressIconWrapper}>
        {isDone ? isClosed ? <DoneChartIcon /> : <ProgressChartIcon /> : <AimsProgress item={item} />}
      </div>
      <Box>
        <Box mt={4} mb={8}>
          <Text weight={400} color={'white'} opacity={0.5} size={'s'}>
            {item.name}
          </Text>
        </Box>
        <Box>
          <Text as="span" weight={700} color={'white'} opacity={isClosed ? 0.5 : 1} size={'m'} lineHeight={'150%'}>
            {formatSum(item.total_amount)}
          </Text>
          <Text as="span" weight={400} color={'white'} opacity={0.8} size={'m'} lineHeight={'150%'}>{` / ${formatSum(
            item.amount
          )}`}</Text>
        </Box>
      </Box>
    </div>
  );
};

export default AimProgressBlock;
