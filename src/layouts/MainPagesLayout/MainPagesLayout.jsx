import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Arrow } from 'src/assets/icons';
import { Button, Text } from 'src/components';
import { PATHNAMES } from 'src/consts';
import { getBalance } from 'src/store/slices/transactionsSlice';
import { formatSum } from 'src/utils/common';

import styles from './MainPagesLayout.module.scss';

const MainPagesLayout = ({ customLeftHeaderComponent, pageName, leftColumnChildren, rightColumnChildren }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.transactions.balance);

  const navigateHandler = () => {
    navigate(PATHNAMES.dashboard);
  };

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.linkBlockWrapper}>
          {customLeftHeaderComponent || (
            <Button
              onClick={navigateHandler}
              childrenRotation={90}
              width={32}
              height={32}
              radius={1000}
              bgColor="secondary-back"
            >
              <Arrow />
            </Button>
          )}
          <Text as="h1" color="white">
            {pageName}
          </Text>
        </div>
        <div>
          <Text color={'white'} size="xxl" weight={700}>
            {formatSum(balance)}
          </Text>
          <Text weight={400} color={'white'} size={'xs'} opacity={'0.5'}>
            На счету
          </Text>
        </div>
      </div>
      <div className={styles.childrenWrapper}>
        {leftColumnChildren}
        {rightColumnChildren}
      </div>
    </div>
  );
};

export default MainPagesLayout;
