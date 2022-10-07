import { useDispatch, useSelector } from 'react-redux';

import { sortTransactions } from 'src/store/slices/transactionsSlice';
import { classnames } from 'src/utils';

import styles from './TableSort.module.scss';

const TableSort = ({ name, children }) => {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.transactions.sort[name]);
  const sortHandler = () => {
    dispatch(sortTransactions([name, sortType]));
  };

  return (
    <p onClick={sortHandler} className={classnames([styles.text, styles[`text__${sortType}`]])}>
      <span className={classnames([styles.iconWrapper, styles[`iconWrapper__${sortType}`]])}>&darr;</span>
      {children}
    </p>
  );
};

export default TableSort;
