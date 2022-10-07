import { useDispatch } from 'react-redux';

import { Modal, Button, Text, Box } from 'src/components';
import { deleteAim } from 'src/store/slices/aimsSlice';

import styles from './DeleteAimModal.module.scss';

const DeleteAimModal = ({ itemId, isOpened, handleClose, handleDeletionOpen }) => {
  const dispatch = useDispatch();

  const handleDeleteTransaction = () => {
    dispatch(deleteAim({ aimId: itemId, callback: handleClose, modal: handleDeletionOpen }));
  };

  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.deleteTextWrapper}>
        <Text size={'xxl'} weight={700} color="white">
          Удалить цель?
        </Text>
      </div>
      <Box>
        <Text size={'m'} color="default">
          Вы не сможете отменить изменения
        </Text>
      </Box>
      <div className={styles.deleteButtonsWrapper}>
        <Button width={196} height={56} bgColor="back" variant="brand" onClick={handleClose}>
          <Text weight={500} size="xl" color="brand">
            Назад
          </Text>
        </Button>
        <Button width={196} height={56} bgColor="error" variant="brand" onClick={handleDeleteTransaction}>
          <Text weight={500} size="xl" color="contrast">
            Удалить
          </Text>
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteAimModal;
