import { useState } from 'react';

import { EditIcon, TrashIcon } from 'src/assets/icons';
import { Button, Text } from 'src/components';
import DeleteAimModal from 'src/pages/AimsPage/AimsModals/DeleteAimModal/DeleteAimModal';
import InspectOrUpdateAimModal from 'src/pages/AimsPage/AimsModals/InspectOrUpdateAimModal/InspectOrUpdateAimModal';

import styles from './AimPopupContent.module.scss';

const AimPopupContent = ({ id, handleDeletionOpen }) => {
  const [isInspectOrUpdateOpened, setIsInspectOrUpdateOpened] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);

  const handleInspectOrUpdateClose = () => setIsInspectOrUpdateOpened(false);
  const handleDeleteClose = () => setIsDeleteOpened(false);

  const handleInspectOrUpdateOpen = () => {
    setIsInspectOrUpdateOpened(true);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteOpened(true);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={handleInspectOrUpdateOpen} variant="ghost">
          <EditIcon style={{ marginRight: '5px' }} />
          <Text color={'white'} size={'l'} weight={400}>
            Подробности
          </Text>
        </Button>
        <Button onClick={handleDeleteModalOpen} variant="ghost">
          <TrashIcon style={{ marginRight: '5px' }} />
          <Text color={'white'} size={'l'} weight={400}>
            Удалить
          </Text>
        </Button>
      </div>
      <InspectOrUpdateAimModal id={id} isOpened={isInspectOrUpdateOpened} handleClose={handleInspectOrUpdateClose} />
      <DeleteAimModal
        itemId={id}
        isOpened={isDeleteOpened}
        handleClose={handleDeleteClose}
        handleDeletionOpen={handleDeletionOpen}
      />
    </>
  );
};

export default AimPopupContent;
