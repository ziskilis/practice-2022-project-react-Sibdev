import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSwiperSlide } from 'swiper/react';

import { Box, Button, Text } from 'src/components';
import { finishAim } from 'src/store/slices/aimsSlice';
import { formatSum } from 'src/utils/common';

import FinishAimModal from '../../AimsModals/FinishAimModal/FinishAimModal';
import TopUpModal from '../../AimsModals/TopUpModal';

import styles from './AimCard.module.scss';
import AimCardButton from './AimCardButton/AimCardButton';
import AimProgressBlock from './AimProgressBlock';

const AimCard = ({ data, handleSuccessModalOpened, handleErrorModalOpened, handleDeletionOpen }) => {
  const dispatch = useDispatch();
  const [isTopUpModalOpened, setIsTopUpModalOpened] = useState(false);

  const handleTopUpModalClose = () => setIsTopUpModalOpened(false);

  const handleTopUpModalOpened = () => {
    setIsTopUpModalOpened(true);
  };
  const { id, name, amount, days_to_end, percent, total_amount, current_month_amount, is_closed } = data;
  const isDone = total_amount / amount >= 1;
  const overdue = days_to_end < 0;
  const slide = useSwiperSlide();

  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(!isOpened);
  const handleClose = () => setIsOpened(false);

  const handleFinishModal = () => {
    dispatch(finishAim({ aimId: id, callback: toggleOpen }));
  };
  return (
    <div style={{ opacity: slide.isActive || slide.isNext ? 1 : 0.5 }} className={styles.wrapper}>
      <div className={styles.AimCardButtonShadow}></div>
      <div className={styles.AimCardButtonWrapper}>
        <AimCardButton handleDeletionOpen={handleDeletionOpen} id={data.id} aimClosed={is_closed} />
      </div>
      <div className={styles.AimCardWrapper}>
        <AimProgressBlock item={data} isClosed={is_closed} />
        <div className={styles.cardText}>
          <div>В этом месяце</div>
          <Text opacity={0.8} color={'white'}>
            {is_closed ? '-' : formatSum(current_month_amount)}
          </Text>
        </div>
        <div className={styles.cardText}>
          <div>Ставка</div>
          <Text opacity={0.8} color={'white'}>
            {`${formatSum(percent)} %`}
          </Text>
        </div>
        <div className={styles.cardText}>
          <div>{overdue ? 'Просрочено на (дней)' : 'Осталось дней'}</div>
          <Text opacity={0.8} color={overdue ? 'red' : 'white'}>
            {is_closed ? '-' : (overdue ? days_to_end * -1 : days_to_end).toString()}
          </Text>
        </div>
        <Box mt={6}>
          <Button
            onClick={isDone ? handleFinishModal : handleTopUpModalOpened}
            width={'208px'}
            height={'56px'}
            bgColor={is_closed ? 'secondary-back' : isDone ? 'green' : 'brand'}
          >
            <Text weight={500} size={'xl'} color={'white'} opacity={is_closed ? 0.5 : 1} lineHeight={'120%'}>
              {is_closed ? 'Завершена' : isDone ? 'Завершить' : 'Пополнить'}
            </Text>
          </Button>
        </Box>
        <TopUpModal
          item={data}
          isOpened={isTopUpModalOpened}
          handleClose={handleTopUpModalClose}
          handleSuccessModalOpened={handleSuccessModalOpened}
          handleErrorModalOpened={handleErrorModalOpened}
        />
      </div>
      <FinishAimModal isOpened={isOpened} handleClose={handleClose} name={name} />
    </div>
  );
};

export default AimCard;
