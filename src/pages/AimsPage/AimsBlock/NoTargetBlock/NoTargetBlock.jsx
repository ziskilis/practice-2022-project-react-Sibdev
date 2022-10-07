import { useState } from 'react';

import { NoTargetIcon } from 'src/assets/icons';
import { Box, Button, Text } from 'src/components';

import CreateAimModal from '../../AimsModals/CreateAimModal';

import styles from './NoTargetBlock.module.scss';

const NoTargetBlock = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

  const handleCreateModalClose = () => setIsCreateModalOpened(false);

  const handleCreateModalOpened = () => {
    setIsCreateModalOpened(true);
  };
  return (
    <div className={styles.wrapper}>
      <NoTargetIcon />
      <Box mt={20} mb={28}>
        <Text weight={400} opacity={0.5} color={'white'} size={'m'}>
          У вас нет ни одной цели
        </Text>
      </Box>
      <Button onClick={handleCreateModalOpened} width={240} height={56} bgColor={'brand'}>
        <Text color={'white'} size={'xl'} weight={500}>
          Добавить цель
        </Text>
      </Button>
      <CreateAimModal isOpened={isCreateModalOpened} handleClose={handleCreateModalClose} />
    </div>
  );
};
export default NoTargetBlock;
