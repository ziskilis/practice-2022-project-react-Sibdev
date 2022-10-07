import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainPagesLayout } from 'src/layouts';
import { getUserInfo } from 'src/store/slices/userActions';

import Operations from '../Pockets/Operations';

import CustomLeftHeaderComponent from './CustomLeftHeaderComponent/CustomLeftHeaderComponent';
import styles from './Dashboard.module.scss';
import TopTargetsBlock from './TopTargetsBlock';
import TotalStatisticBlock from './TotalStatisticBlock';

const Dashboard = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.username);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <MainPagesLayout
      customLeftHeaderComponent={<CustomLeftHeaderComponent />}
      pageName={name}
      leftColumnChildren={
        <div className={styles.wrapper}>
          <TotalStatisticBlock />
          <Operations dashboard />
        </div>
      }
      rightColumnChildren={<TopTargetsBlock />}
    />
  );
};

export default Dashboard;
