import { useState } from 'react';

import { EditIcon, TrashIcon } from 'src/assets/icons';
import { Button, Text } from 'src/components';

import { DeleteTransactionModal } from '../../../TableModals';
import AddNewOrUpdateTransactionModal from '../../../TableModals/AddNewOrUpdateTransactionModal';

import styles from './TableItemButtons.module.scss';

const TableItemButtons = ({ item }) => {
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);

  const handleEditClose = () => setIsEditOpened(false);
  const handleDeleteClose = () => setIsDeleteOpened(false);

  const handleEdit = () => {
    setIsEditOpened(true);
  };

  const handleDelete = () => {
    setIsDeleteOpened(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Button variant="ghost" onClick={handleEdit}>
          <EditIcon />
          <Text color={'white'} size={'l'} weight={400}>
            Редактировать
          </Text>
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          <TrashIcon />
          <Text color={'white'} size={'l'} weight={400}>
            Удалить
          </Text>
        </Button>
      </div>
      <AddNewOrUpdateTransactionModal update transaction={item} isOpened={isEditOpened} handleClose={handleEditClose} />
      <DeleteTransactionModal itemId={item.id} isOpened={isDeleteOpened} handleClose={handleDeleteClose} />
    </>
  );
};

export default TableItemButtons;
