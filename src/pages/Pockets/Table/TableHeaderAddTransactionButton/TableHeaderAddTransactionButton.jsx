import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AddIcon } from 'src/assets/icons';
import { Box, Button, Text } from 'src/components';

import { AddNewTransactionModal } from '../../TableModals';

const TableHeaderAddTransactionButton = () => {
  const transactions = useSelector((state) => state.transactions.list);
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
  };

  const openModal = () => setIsOpened(true);

  if (!transactions.length) return null;

  return (
    <>
      <Button variant="ghost" onClick={openModal}>
        <Box mr={12}>
          <Text color="brand" size="xxs">
            Добавить
          </Text>
        </Box>
        <AddIcon />
      </Button>
      <AddNewTransactionModal isOpened={isOpened} handleClose={handleClose} />
    </>
  );
};

export default TableHeaderAddTransactionButton;
