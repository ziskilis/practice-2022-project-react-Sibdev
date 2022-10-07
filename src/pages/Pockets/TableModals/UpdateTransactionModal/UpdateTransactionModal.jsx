import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, TableDateInput, TableSelectInput, TableAmountInput, Button, Text } from 'src/components';
import { updateTransaction } from 'src/store/slices/transactionsSlice';

import styles from './UpdateTransactionModal.module.scss';

const UpdateTransactionModal = ({ item, isOpened, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const [date, setDate] = useState(item.transaction_date);
  const [amount, setAmount] = useState(item.amount.toString());
  const [category, setCategory] = useState(item.category.id);

  const [isAmountError, setIsAmountError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);

  const handleDateChange = (value) => setDate(value);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setIsAmountError(false);
  };
  const handleCategoryChange = (event) => {
    try {
      const rawCategory = Number(event.target.value);
      if (Number.isNaN(rawCategory)) throw new Error('category is NaN');
      setCategory(rawCategory);
      setIsCategoryError(false);
    } catch {
      setIsCategoryError(true);
    }
  };

  const validateForm = () => {
    let isError = false;

    if (!amount || Number(amount) === 0) {
      setIsAmountError(true);
      isError = true;
    }
    if (category === -1 || !category) {
      setIsCategoryError(true);
      isError = true;
    }
    return isError;
  };

  const handleUpdateTransaction = () => {
    if (validateForm()) return;

    dispatch(
      updateTransaction({
        data: {
          category,
          transaction_date: date,
          amount: Number(amount),
          transaction_type: 'expense',
        },
        transactionId: item.id,
        callback: handleClose,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} title="Изменить данные" handleClose={handleClose}>
      <div className={styles.inputsContainer}>
        <TableDateInput max={new Date()} value={date} onChange={handleDateChange} />
        <TableSelectInput
          isError={isCategoryError}
          selectOptions={categories}
          placeholder="Категория"
          emptyListText="Нет категорий"
          value={category}
          onChange={handleCategoryChange}
        />
        <TableAmountInput isError={isAmountError} value={amount} placeholder="Сумма" onChange={handleAmountChange} />
      </div>
      <Button radius={0} height={53} variant="brand" onClick={handleUpdateTransaction}>
        <Text weight={700} size="xl" color="contrast">
          Сохранить
        </Text>
      </Button>
    </Modal>
  );
};

export default UpdateTransactionModal;
