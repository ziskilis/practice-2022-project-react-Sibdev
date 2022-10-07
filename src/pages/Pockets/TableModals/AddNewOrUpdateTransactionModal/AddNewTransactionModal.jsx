import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Text, Button, Box, TableAmountInput, TableDateInput, TableSelectInput } from 'src/components';
import { addNewTransaction, updateTransaction } from 'src/store/slices/transactionsSlice';

import styles from './AddNewOrUpdateTransactionModal.module.scss';

const AddNewOrUpdateTransactionModal = ({ update, transaction, isOpened, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  const [transactionType, setTransactionType] = useState(transaction?.category ? 'expense' : 'income');
  const [date, setDate] = useState(transaction?.transaction_date || '');
  const [amount, setAmount] = useState(transaction?.amount || '');
  const [category, setCategory] = useState(transaction?.category?.id || '');

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
    if (!transaction) resetForm();
  };

  const onCloseModal = () => {
    handleClose();
    if (!transaction) resetForm();
  };

  const changeToIncome = () => changeTransactionType('income');
  const changeToExpense = () => changeTransactionType('expense');

  const handleDateChange = (value) => {
    setIsDateError(false);
    value = value.split('/');
    setDate([value[2], value[0], value[1]].join('-'));
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setIsAmountError(false);
  };

  const handleCategoryChange = (event) => {
    try {
      const rawCategory = event;
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

    if (transaction) {
      dispatch(
        transactionType === 'expense'
          ? updateTransaction({
              data: {
                category,
                transaction_date: date,
                amount: Number(amount),
                transaction_type: 'expense',
              },
              transactionId: transaction.id,
              callback: handleClose,
            })
          : updateTransaction({
              data: {
                category,
                transaction_date: date,
                amount: Number(amount),
                transaction_type: 'income',
              },
              transactionId: transaction.id,
              callback: handleClose,
            })
      );
      return;
    }

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
    <Modal isOpened={isOpened} title={update ? 'Изменить данные' : 'Добавить операцию'} handleClose={onCloseModal}>
      <div className={styles.buttonsWrapper}>
        <Box>
          <Button
            radius={'100px 0 0 100px'}
            width={'123px'}
            height={'40px'}
            bgColor={transactionType === 'income' ? 'brand' : 'back'}
            onClick={changeToIncome}
          >
            <Box pt={5} pr={5} pb={5} pl={5}>
              <Text weight={700} size={'m'} color={transactionType === 'income' ? 'contrast' : 'brand'}>
                Доход +
              </Text>
            </Box>
          </Button>
        </Box>
        <Button
          radius={'0 100px 100px 0'}
          width={'123px'}
          height={'40px'}
          bgColor={transactionType === 'expense' ? 'brand' : 'back'}
          onClick={changeToExpense}
        >
          <Box pt={5} pr={5} pb={5} pl={5}>
            <Text weight={700} size={'m'} color={transactionType === 'expense' ? 'contrast' : 'brand'}>
              Расход -
            </Text>
          </Box>
        </Button>
      </div>
      <div className={styles.inputsContainer}>
        <TableDateInput
          radius={'100px 0 0 100px'}
          isError={isDateError}
          max={new Date()}
          value={date}
          onChange={handleDateChange}
        />
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
        <TableAmountInput
          radius={'0 100px 100px 0'}
          isError={isAmountError}
          value={amount}
          placeholder="Сумма"
          onChange={handleAmountChange}
        />
      </div>
      <Button variant="primary" onClick={handleCreateTransaction}>
        <Text weight={500} size="xl" color="contrast">
          {update ? 'Сохранить' : 'Добавить'}
        </Text>
      </Button>
    </Modal>
  );
};

export default AddNewOrUpdateTransactionModal;
