import { Modal, Button, Text, Box } from 'src/components';

import styles from './TopUpSuccessModal.module.scss';

const TopUpSuccessModal = ({ isOpened, handleClose }) => {
  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <div className={styles.TopUpSuccessIcon}></div>
        <Text size={'l'} weight={700} lineHeight="150%" color="white">
          Успешно пополнено
        </Text>
        <Box mt={32}>
          <Button onClick={handleClose} width={196} height={56} bgColor="brand" variant="brand">
            <Text weight={500} size="xl" color="white">
              Отлично
            </Text>
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default TopUpSuccessModal;
