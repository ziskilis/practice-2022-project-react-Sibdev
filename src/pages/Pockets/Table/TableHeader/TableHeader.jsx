import { classnames } from 'src/utils';

import styles from './TableHeader.module.scss';

const TableHeader = ({ headerGroups }) => {
  return (
    <thead className={styles.header}>
      {headerGroups.map((headerGroup) => {
        const { className: groupClassName, ...restGroupProps } = headerGroup.getHeaderGroupProps();
        return (
          <tr {...restGroupProps} className={classnames([groupClassName, styles.row])}>
            {headerGroup.headers.map((column) => {
              const { className: columnClassName, ...restColumnProps } = column.getHeaderProps();
              return (
                <th {...restColumnProps} className={classnames([styles.headerItem, columnClassName])}>
                  <div name={column.id} className={styles.headerItem}>
                    {column.render('Header')}
                  </div>
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};

export default TableHeader;
