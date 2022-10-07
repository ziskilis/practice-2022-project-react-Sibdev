import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { EditIcon, EditIconOld } from 'src/assets/icons';
import { Button, Modal, TableAmountInput, TableDefaultInput, Text } from 'src/components';
import { getAimById, updateAim } from 'src/store/slices/aimsSlice';
import { formatSum } from 'src/utils/common';

import styles from './InspectOrUpdateAimModal.module.scss';

const InspectOrUpdateAimModal = ({ id, isOpened, handleClose }) => {
  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [depositTerm, setDepositTerm] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isAmountError, setIsAmountError] = useState(false);
  const [isPercentError, setIsPercentError] = useState(false);
  const [isDepositTermError, setIsDepositTermError] = useState(false);

  const handleNameChange = (event) => {
    if (event.target.value.match(/[,.[\]{}&$@^:;=<>]/)) return;
    setName(event.target.value);
    setIsNameError(false);
  };

  const handlePercentChange = (event) => {
    setPercent(event.target.value);
    setIsPercentError(false);
  };

  const handleDepositTermChange = (event) => {
    setDepositTerm(event.target.value);
    setIsDepositTermError(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setIsAmountError(false);
  };

  const onClose = () => {
    handleClose();
  };

  const togleIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  useEffect(() => {
    dispatch(getAimById(id)).then((res) => {
      setItem(res.payload);
      setName(res.payload.name);
      setAmount(res.payload.amount.slice(0, -3));
      setPercent(res.payload.percent.slice(0, -3));
      setDepositTerm(res.payload.deposit_term);
    });
  }, [dispatch, id]);

  const handleUpdateAim = () => {
    dispatch(
      updateAim({
        data: {
          name,
          amount,
          percent,
          deposit_term: depositTerm,
        },
        aimId: id,
        callback: handleClose,
      })
    );
  };

  return (
    <Modal isOpened={isOpened} handleClose={onClose}>
      <div className={styles.mainWrapper}>
        {isUpdate ? (
          <div className={styles.editInputWrapper}>
            <div className={styles.headerIconWrapper}>
              <EditIconOld />
            </div>
            <TableDefaultInput
              width="440px"
              radius="0 100px 100px 0"
              textAlign="left"
              isError={isNameError}
              value={name}
              onChange={handleNameChange}
            />
          </div>
        ) : (
          <div className={styles.headerItem}>
            <Text weight={700} size="xl" lineHeight="150%" color="white">
              {item.name}
            </Text>
            <button className={styles.editButton} onClick={(e) => togleIsUpdate(e)}>
              <EditIcon style={{ marginRight: '5px' }} />
              <Text weight={400} size="s" lineHeight="150%" color="brand">
                Редактировать
              </Text>
            </button>
          </div>
        )}
        <div className={styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Накоплено
          </Text>
          <Text weight={400} size="m" lineHeight="150%" color="white">
            {formatSum(item.total_amount)}
          </Text>
        </div>
        <div className={isUpdate ? styles.editItem : styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Цель
          </Text>
          {isUpdate ? (
            <TableAmountInput
              radius="100px"
              isError={isAmountError}
              value={amount}
              onChange={handleAmountChange}
              width="160px"
            />
          ) : (
            <Text weight={400} size="m" lineHeight="150%" color="white">
              {formatSum(item.amount)}
            </Text>
          )}
        </div>
        <div className={styles.line}></div>
        <div className={styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Дата создания
          </Text>
          <Text weight={400} size="m" lineHeight="150%" color="white">
            {new Date(item.created_at)
              .toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
              .slice(0, -3)}
          </Text>
        </div>
        <div className={isUpdate ? styles.editItem : styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Срок вклада (месяцев)
          </Text>
          {isUpdate ? (
            <TableAmountInput
              radius="100px"
              isError={isDepositTermError}
              value={depositTerm}
              onChange={handleDepositTermChange}
              width="80px"
            />
          ) : (
            <Text weight={400} size="m" lineHeight="150%" color="white">
              {item.deposit_term?.toString()}
            </Text>
          )}
        </div>
        <div className={styles.line}></div>
        <div className={isUpdate ? styles.editItem : styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Ставка
          </Text>
          {isUpdate ? (
            <div className={styles.percentInputWrapper}>
              <TableAmountInput
                radius="100px 0 0 100px"
                isError={isPercentError}
                value={percent}
                onChange={handlePercentChange}
                width="55px"
              />
              <div className={styles.percentIconWrapper}>
                <Text weight={400} size="m" lineHeight="150%" color="white">
                  %
                </Text>
              </div>
            </div>
          ) : (
            <Text weight={400} size="m" lineHeight="150%" color="white">
              {`${formatSum(item.percent)} %`}
            </Text>
          )}
        </div>
        <div className={styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Доход от % в этом месяце
          </Text>
          <Text weight={400} size="m" lineHeight="150%" color="white">
            {formatSum(item.current_month_percent_amount)}
          </Text>
        </div>
        <div className={styles.inspectItem}>
          <Text weight={400} size="s" lineHeight="150%" color="white" opacity={0.5}>
            Доход от % за всё время
          </Text>
          <Text weight={400} size="m" lineHeight="150%" color="white">
            {formatSum(item.total_percent_amount)}
          </Text>
        </div>
        <div className={styles.buttonBlockWrapper}>
          {isUpdate && (
            <button onClick={(event) => togleIsUpdate(event)} className={styles.abortButton}>
              <Text weight={500} size="xl" lineHeight="120%" color="brand">
                Отменить
              </Text>
            </button>
          )}
          <Button onClick={isUpdate ? handleUpdateAim : handleClose} bgColor={'brand'} width={'196px'} height={'56px'}>
            <Text weight={500} size="xl" lineHeight="120%" color="white">
              {isUpdate ? 'Сохранить' : 'Пополнить'}
            </Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InspectOrUpdateAimModal;
