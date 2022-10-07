import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Modal, TableDefaultInput, Text } from 'src/components';
import { addNewCategory } from 'src/store/slices/categoriesSlice';

import styles from './AddNewCategoryModal.module.scss';

const AddNewCategoryModal = ({ isOpened, handleClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleOnChange = (event) => {
    if (event.target.value.match(/[,.[\]{}&$@^:;=<>]/)) return;
    setName(event.target.value);
  };

  const onCloseModal = () => {
    setName('');
    handleClose();
  };

  const handleAddNewCategory = () => {
    dispatch(
      addNewCategory({
        name,
      })
    ).then((res) => {
      if (!res?.error) onCloseModal();
    });
  };

  return (
    <Modal isOpened={isOpened} title="Добавить категорию" handleClose={onCloseModal}>
      <div className={styles.inputsContainer}>
        <TableDefaultInput
          width={'320px'}
          radius={'100px'}
          value={name}
          placeholder="Введите название категории"
          onChange={handleOnChange}
        />
      </div>
      <Button variant="primary" onClick={handleAddNewCategory}>
        <Text weight={500} size="xl" color="contrast">
          Добавить
        </Text>
      </Button>
    </Modal>
  );
};

export default AddNewCategoryModal;
