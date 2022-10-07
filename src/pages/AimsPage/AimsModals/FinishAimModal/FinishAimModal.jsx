import { Modal, Button, Text, Box } from 'src/components';

import styles from './FinishAimModal.module.scss';

const FinishAimModal = ({ isOpened, handleClose, name }) => {
  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <div className={styles.finishIcon}></div>
        <Text size={'l'} weight={700} lineHeight="150%" color="white">
          Цель выполнена
        </Text>

        <Text size={'m'} lineHeight={'150%'} color="default" align="center">
          {`Поздравлеяем! Вы успешно выполнили цель "${name}"`}
        </Text>
      </div>
      <Box mt={32}>
        <Button width={196} height={56} bgColor="brand" onClick={handleClose}>
          <Text weight={500} size="xl" lineHeight="150%" color="white">
            Отлично
          </Text>
        </Button>
      </Box>
    </Modal>
  );
};

export default FinishAimModal;
