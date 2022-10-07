import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Text, Button, Box, TableAmountInput, TableDateInput, TableSelectInput } from 'src/components';
import { addNewTransaction } from 'src/store/slices/transactionsSlice';

import styles from './AddNewTransactionModal.module.scss';

const AddNewTransactionModal = ({ isOpened, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  const [transactionType, setTransactionType] = useState('expense');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const [isDateError, setIsDateError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);

  const resetForm = () => {
    setDate('');
    setAmount('');
    setCategory('');
    setIsDateError(false);
    setIsAmountError(false);
    setIsCategoryError(false);
  };

  const changeTransactionType = (type) => {
    setTransactionType(type);
    resetForm();
  };

  const onCloseModal = () => {
    handleClose();
    resetForm();
  };

  const changeToIncome = () => changeTransactionType('income');
  const changeToExpense = () => changeTransactionType('expense');

  const handleDateChange = (value) => {
    setIsDateError(false);
    setDate(value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setIsAmountError(false);
  };

  const handleCategoryChange = (event) => {
    try {
      const rawCategory = event.target.value;
      if (Number.isNaN(rawCategory)) throw new Error('category is NaN');
      setCategory(rawCategory);
      setIsCategoryError(false);
    } catch {
      setIsCategoryError(true);
    }
  };

  const validateForm = () => {
    let isError = false;

    if (!date) {
      setIsDateError(true);
      isError = true;
    }
    if (!amount || Number(amount) === 0) {
      setIsAmountError(true);
      isError = true;
    }
    if ((category === -1 || !category) && transactionType === 'expense') {
      setIsCategoryError(true);
      isError = true;
    }
    return isError;
  };

  const handleCreateTransaction = () => {
    if (validateForm()) return;

    dispatch(
      addNewTransaction({
        data: {
          category,
          transaction_date: date,
          amount,
          transaction_type: transactionType,
        },
        callback: onCloseModal,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} title="Добавить данные" handleClose={onCloseModal}>
      <div className={styles.buttonsWrapper}>
        <Box mr={24}>
          <Button bgColor={transactionType === 'expense' ? 'brand' : 'glass'} onClick={changeToExpense}>
            <Box pt={5} pr={5} pb={5} pl={5}>
              <Text color={transactionType === 'expense' ? 'contrast' : 'primary'}>Расход</Text>
            </Box>
          </Button>
        </Box>
        <Button bgColor={transactionType === 'income' ? 'brand' : 'glass'} onClick={changeToIncome}>
          <Box pt={5} pr={5} pb={5} pl={5}>
            <Text color={transactionType === 'income' ? 'contrast' : 'primary'}>Доход</Text>
          </Box>
        </Button>
      </div>
      <div className={styles.inputsContainer}>
        <TableDateInput isError={isDateError} max={new Date()} value={date} onChange={handleDateChange} />
        {transactionType === 'expense' && (
          <TableSelectInput
            placeholder="Категория"
            selectOptions={categories}
            emptyListText="Нет категорий"
            isError={isCategoryError}
            value={category}
            onChange={handleCategoryChange}
          />
        )}
        <TableAmountInput isError={isAmountError} value={amount} placeholder="Сумма" onChange={handleAmountChange} />
      </div>
      <Button radius={0} height={53} variant="brand" onClick={handleCreateTransaction}>
        <Text weight={700} size="xl" color="contrast">
          Добавить
        </Text>
      </Button>
    </Modal>
  );
};

export default AddNewTransactionModal;
