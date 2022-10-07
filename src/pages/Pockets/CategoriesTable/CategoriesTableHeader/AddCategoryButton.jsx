import { useState } from 'react';

import { Button, Box, Text } from 'src/components';

import { AddNewCategoryModal } from '../../TableModals';

import styles from './AddCategoryButton.module.scss';

const AddCategoryButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
  };

  const openModal = () => setIsOpened(true);

  return (
    <>
      <Button variant="ghost" onClick={openModal}>
        <Box mr={12}>
          <Text color="brand" size="s">
            Добавить категорию
          </Text>
        </Box>
        <div className={styles.buttonIcon}>
          <span>+</span>
        </div>
      </Button>
      <AddNewCategoryModal isOpened={isOpened} handleClose={handleClose} />
    </>
  );
};

export default AddCategoryButton;
