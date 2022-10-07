import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { PlusIcon } from 'src/assets/icons';
import { Button, Text } from 'src/components';

import CreateAimModal from '../AimsModals/CreateAimModal';
import SuccessfulDeletion from '../AimsModals/SuccessfulDeletion/SuccessfulDeletion';
import TopUpErrorModal from '../AimsModals/TopUpModal/TopUpErrorModal';
import TopUpSuccessModal from '../AimsModals/TopUpModal/TopUpSuccessModal';

import AimCard from './AimCard';
import styles from './AimsBlock.module.scss';
import AimsSortButton from './AimsSortButton';
import NoTargetBlock from './NoTargetBlock';

const AimsBlock = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [isDeletionModalOpened, setIsDeletionModalOpened] = useState(false);
  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);
  const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);

  const handleDeletionModalClose = () => setIsDeletionModalOpened(false);
  const handleCreateModalClose = () => setIsCreateModalOpened(false);
  const handleSuccessModalClose = () => setIsSuccessModalOpened(false);
  const handleErrorModalClose = () => setIsErrorModalOpened(false);

  const handleCreateModalOpened = () => {
    setIsCreateModalOpened(true);
  };

  const handleDeletionModalOpened = () => {
    setIsDeletionModalOpened(true);
  };
  const handleSuccessModalOpened = () => {
    setIsSuccessModalOpened(true);
  };
  const handleErrorModalOpened = () => {
    setIsErrorModalOpened(true);
  };
  const aimCards = useSelector((state) => state.aims.list);
  return (
    <div className={styles.aimsBlockWrapper}>
      <div className={styles.headerBlockWrapper}>
        <Text weight={700} as={'h3'} color={'white'} size={'l'}>
          Цели
        </Text>
        {!!aimCards?.length && (
          <div className={styles.headerButtonBlockWrapper}>
            <Button width={'153px'} height={'32px'} bgColor={'back'} onClick={handleCreateModalOpened}>
              <PlusIcon style={{ marginRight: '5px' }} />
              <Text lineHeight="150%" weight={400} size={'s'} color={'brand'}>
                Добавить цель
              </Text>
            </Button>
            <AimsSortButton />
          </div>
        )}
      </div>
      <div className={styles.mainWrapper}>
        {aimCards?.length ? (
          <Swiper modules={[Scrollbar]} slidesPerView={2.5} mousewheel={true} scrollbar={{ draggable: true }}>
            {aimCards.map((el) => (
              <SwiperSlide key={el.id}>
                <AimCard
                  handleDeletionOpen={handleDeletionModalOpened}
                  data={el}
                  handleSuccessModalOpened={handleSuccessModalOpened}
                  handleErrorModalOpened={handleErrorModalOpened}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NoTargetBlock />
        )}
      </div>
      <CreateAimModal isOpened={isCreateModalOpened} handleClose={handleCreateModalClose} />
      <SuccessfulDeletion isOpened={isDeletionModalOpened} handleClose={handleDeletionModalClose} />
      <TopUpErrorModal isOpened={isErrorModalOpened} handleClose={handleErrorModalClose} />
      <TopUpSuccessModal isOpened={isSuccessModalOpened} handleClose={handleSuccessModalClose} />
    </div>
  );
};

export default AimsBlock;
