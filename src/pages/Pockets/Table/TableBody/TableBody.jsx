import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadNewTransactions } from 'src/store/slices/transactionsActions';
import { classnames } from 'src/utils';

import styles from './TableBody.module.scss';

const TableBody = ({ rows, getTableBodyProps, prepareRow }) => {
  const { className: tableClassName, ...restTableProps } = getTableBodyProps();
  const dispatch = useDispatch();
  const isAllFetched = useSelector((state) => state.transactions.didWeGetAllTransactions);
  const isNewTransactionsPending = useSelector((state) => state.transactions.isNewTransactionsPending);
  const offset = useSelector((state) => state.transactions.offset);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isAllFetched || isNewTransactionsPending) return;

    const { current } = bodyRef;

    if (!current) return;

    const handleScroll = () => {
      if (current.scrollTop === current.scrollHeight - current.clientHeight) {
        dispatch(loadNewTransactions({ offset }));
      }
    };

    current.addEventListener('scroll', handleScroll);
    return () => current.removeEventListener('scroll', handleScroll);
  }, [isAllFetched, isNewTransactionsPending, offset, dispatch]);

  return (
    <tbody ref={bodyRef} {...restTableProps} className={classnames([styles.body, tableClassName])}>
      {rows.map((row) => {
        prepareRow(row);
        const { className: rowClassName, ...restRowProps } = row.getRowProps();
        return (
          <tr {...restRowProps} className={classnames([styles.row, rowClassName])}>
            {row.cells.map((cell) => {
              const { className: cellClassName, ...restCellProps } = cell.getCellProps();
              return (
                <td className={classnames([styles.cell, cellClassName])} {...restCellProps}>
                  <div className={styles.cellItem}>{cell.render('Cell')}</div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
