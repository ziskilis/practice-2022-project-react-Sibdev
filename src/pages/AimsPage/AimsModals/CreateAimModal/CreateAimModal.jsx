import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Button, Modal, TableAmountInput, TableDefaultInput, TableSelectInput, Text } from 'src/components';
import { addNewAim } from 'src/store/slices/aimsSlice';

import styles from './CreateAimModal.module.scss';

const CreateAimModal = ({ isOpened, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [percent, setPercent] = useState('');
  const [depositTerm, setDepositTerm] = useState('');
  const [category, setCategory] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);
  const [isInitialDepositError, setIsInitialDepositError] = useState(false);
  const [isPercentError, setIsPercentError] = useState(false);
  const [isDepositTermError, setIsDepositTermError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);

  const resetForm = () => {
    setName('');
    setAmount('');
    setInitialDeposit('');
    setPercent('');
    setDepositTerm('');
    setCategory('');

    setIsNameError(false);
    setIsAmountError(false);
    setIsInitialDepositError(false);
    setIsPercentError(false);
    setIsDepositTermError(false);
    setIsCategoryError(false);
  };

  const onCloseModal = () => {
    handleClose();
    resetForm();
  };

  const handlePercentChange = (event) => {
    setPercent(event.target.value);
    setIsPercentError(false);
  };

  const handleInitialDepositChange = (event) => {
    setInitialDeposit(event.target.value);
    setIsInitialDepositError(false);
  };

  const handleNameChange = (event) => {
    if (event.target.value.match(/[,.[\]{}&$@^:;=<>]/)) return;
    setName(event.target.value);
    setIsNameError(false);
  };

  const handleDepositTermChange = (event) => {
    setDepositTerm(event.target.value);
    setIsDepositTermError(false);
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

    if (!name) {
      setIsNameError(true);
      isError = true;
    }
    if (!percent || Number(percent) === 0) {
      setIsPercentError(true);
      isError = true;
    }
    if (!initialDeposit || Number(initialDeposit) === 0) {
      setIsInitialDepositError(true);
      isError = true;
    }
    if (!depositTerm || Number(depositTerm) === 0) {
      setIsDepositTermError(true);
      isError = true;
    }
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

  const handleCreateAim = () => {
    if (validateForm()) return;

    dispatch(
      addNewAim({
        data: {
          name,
          amount,
          initial_deposit: initialDeposit,
          percent,
          deposit_term: depositTerm,
          category_id: category,
        },
        callback: onCloseModal,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} title={'Создание цели'} handleClose={onCloseModal}>
      <div className={styles.modalWrapper}>
        <Text weight={400} color={'white'} opacity={0.5} size={'m'} align={'center'}>
          Создайте цель. Разместите средства под процент.. Получайте статистику по движению к цели и анализируйте выгоду
          от своего вклада!
        </Text>
        <div className={styles.linkWrapper}>
          <Link style={{ textDecorationColor: '#5D5FEF' }} to={'/terms'}>
            <Text weight={400} color={'brand'} size={'m'}>
              ссылка на условия
            </Text>
          </Link>
        </div>
        <Box mb={32}>
          <Box mb={16}>
            <TableDefaultInput
              width={'480px'}
              radius={'100px'}
              textAlign={'left'}
              isError={isNameError}
              value={name}
              placeholder="Введите название цели"
              onChange={handleNameChange}
            />
          </Box>
          <div className={styles.formItem}>
            <Text>Сколько планируете накопить?</Text>
            <TableAmountInput
              radius={'100px'}
              isError={isAmountError}
              value={amount}
              placeholder="Сумма"
              onChange={handleAmountChange}
              width={'120px'}
            />
          </div>
          <div className={styles.formItem}>
            <Text>С какой суммы планируете начать?</Text>
            <TableAmountInput
              radius={'100px'}
              isError={isInitialDepositError}
              value={initialDeposit}
              placeholder="Сумма"
              onChange={handleInitialDepositChange}
              width={'120px'}
            />
          </div>
          <div className={styles.formItem}>
            <Text>Категория</Text>
            <TableSelectInput
              placeholder="Категория"
              selectOptions={categories}
              emptyListText="Нет категорий"
              isError={isCategoryError}
              value={category}
              onChange={handleCategoryChange}
              radius={'100px'}
              width={'168px'}
              height={'44px'}
            />
          </div>
          <div className={styles.formItem}>
            <Text>Срок (месяцы)</Text>
            <TableAmountInput
              radius={'100px'}
              isError={isDepositTermError}
              value={depositTerm}
              placeholder="1"
              onChange={handleDepositTermChange}
              width={'80px'}
            />
          </div>
          <div className={styles.formItem}>
            <Text>Процент</Text>
            <TableAmountInput
              radius={'100px'}
              isError={isPercentError}
              value={percent}
              placeholder="0 %"
              onChange={handlePercentChange}
              width={'80px'}
            />
          </div>
        </Box>
        <Button onClick={handleCreateAim} width={208} height={56} bgColor={'brand'}>
          <Text color={'white'} weight={500} size={'xl'}>
            Создать
          </Text>
        </Button>
      </div>
    </Modal>
  );
};

export default CreateAimModal;
