import { useDispatch } from 'react-redux';

import { Modal, Button, Text, Box } from 'src/components';
import { deleteTransaction } from 'src/store/slices/transactionsSlice';

import styles from './DeleteTransactionModal.module.scss';

const DeleteTransactionModal = ({ itemId, isOpened, handleClose }) => {
  const dispatch = useDispatch();

  const handleDeleteTransaction = () => {
    dispatch(
      deleteTransaction({
        transactionId: itemId,
        callback: handleClose,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.deleteTextWrapper}>
        <Text size={'xxl'} weight={700} color="white">
          Удалить операцию?
        </Text>
      </div>
      <Box mb={32}>
        <Text size={'m'} color="default">
          Вы не сможете отменить действие
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

export default DeleteTransactionModal;
