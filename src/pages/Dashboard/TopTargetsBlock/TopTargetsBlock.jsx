import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Arrow } from 'src/assets/icons';
import { Button, Text } from 'src/components';
import { PATHNAMES } from 'src/consts';
import AimProgressBlock from 'src/pages/AimsPage/AimsBlock/AimCard/AimProgressBlock';
import NoTargetBlock from 'src/pages/AimsPage/AimsBlock/NoTargetBlock';
import { getTopAims } from 'src/store/slices/aimsSlice';

import styles from './TopTargetsBlock.module.scss';

const TopTargetsBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topAims = useSelector((state) => state.aims.topAims);

  const navigateHandler = () => {
    navigate(PATHNAMES.aims);
  };

  useEffect(() => {
    dispatch(getTopAims());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.blockTitleWrapper}>
          <Text color={'white'} size={'l'} weight={700}>
            Цели
          </Text>
          <Button
            onClick={navigateHandler}
            childrenRotation={270}
            width={32}
            height={32}
            radius={1000}
            bgColor={'back'}
          >
            <Arrow />
          </Button>
        </div>
      </div>
      {topAims.length ? (
        topAims.map((item, index) => (
          <div key={index} className={styles.progressBlockWrapper}>
            <AimProgressBlock item={item} />
          </div>
        ))
      ) : (
        <div className={styles.emptyTopAims}>
          <NoTargetBlock />
        </div>
      )}
    </div>
  );
};

export default TopTargetsBlock;
