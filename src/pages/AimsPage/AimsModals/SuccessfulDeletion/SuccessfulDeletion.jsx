import { Modal, Button, Text, Box } from 'src/components';

import styles from './SuccessfulDeletion.module.scss';

const SuccessfulDeletion = ({ isOpened, handleClose }) => {
  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <div className={styles.deletionIcon}></div>
        <Text size={'l'} weight={700} lineHeight="150%" color="white">
          Цель удалена
        </Text>
      </div>
      <Box mt={-26}>
        <Button width={196} height={56} bgColor="brand" onClick={handleClose}>
          <Text weight={500} size="xl" lineHeight="150%" color="white">
            К целям
          </Text>
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessfulDeletion;
