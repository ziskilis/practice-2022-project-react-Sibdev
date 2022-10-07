import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button, Text, Box, TableAmountInput } from 'src/components';
import { topUpAim } from 'src/store/slices/aimsSlice';
import { formatSum } from 'src/utils/common';

import styles from './TopUpModal.module.scss';

const TopUpModal = ({ item, isOpened, handleClose, handleSuccessModalOpened, handleErrorModalOpened }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.transactions.balance);
  const [errorText, setErrorText] = useState('');
  const [amount, setAmount] = useState('');

  const [isAmountError, setIsAmountError] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setIsAmountError(false);
  };
  const handleOnFocus = () => {
    setErrorText('');
  };
  const handleCloseHelper = () => {
    setAmount('');
    setErrorText('');
    setIsAmountError(false);
    handleClose();
  };
  const handleTopUpAim = () => {
    if (isAmountError) {
      handleErrorModalOpened();
      handleCloseHelper();
    }
    if (Number(amount) > Number(balance)) {
      setErrorText('Сумма пополнения превышает доступный баланс');
      setIsAmountError(true);
      return;
    }
    if (Number(amount) === 0) {
      setErrorText('Сумма пополнения не может быть нулем');
      setIsAmountError(true);
      return;
    }
    dispatch(
      topUpAim({
        aimId: item.id,
        amount: amount,
        callback: handleCloseHelper,
        success: handleSuccessModalOpened,
        error: handleErrorModalOpened,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} handleClose={handleCloseHelper}>
      <div className={styles.wrapper}>
        <div className={styles.TopUpIcon}></div>
        <Box mb={24}>
          <Text size={'l'} weight={700} lineHeight="150%" color="white">
            Пополнить цель
          </Text>
        </Box>
        <div className={styles.inspectItem}>
          <Text weight={400} size={'s'} lineHeight={'150%'} color={'white'} opacity={0.5}>
            Со счета
          </Text>
          <Text weight={400} size={'m'} lineHeight={'150%'} color={'white'}>
            {formatSum(balance)}
          </Text>
        </div>
        <div className={styles.inspectItem}>
          <Text weight={400} size={'s'} lineHeight={'150%'} color={'white'} opacity={0.5}>
            {`На "${item.name}"`}
          </Text>
          <Box>
            <Text as="span" weight={700} color={'white'} size={'m'} lineHeight={'150%'}>{`${formatSum(
              item.total_amount
            )} `}</Text>
            <Text as="span" weight={400} color={'white'} opacity={0.8} size={'m'} lineHeight={'150%'}>{`/ ${formatSum(
              item.amount
            )}`}</Text>
          </Box>
        </div>
        <div className={styles.editItem}>
          <Text weight={400} size={'s'} lineHeight={'150%'} color={'white'} opacity={0.5}>
            Введите сумму пополнения
          </Text>
          <TableAmountInput
            radius={'100px'}
            isError={isAmountError}
            errorText={errorText}
            value={amount}
            onChange={handleAmountChange}
            onFocus={handleOnFocus}
            width={'228px'}
            placeholder={`от 10 до ${formatSum(balance)}`}
          />
        </div>
        <Button onClick={handleTopUpAim} width={196} height={56} bgColor="brand" variant="brand">
          <Text weight={500} size="xl" color="white">
            Пополнить
          </Text>
        </Button>
      </div>
    </Modal>
  );
};

export default TopUpModal;
