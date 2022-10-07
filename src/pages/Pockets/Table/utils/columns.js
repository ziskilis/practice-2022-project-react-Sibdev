import TableSort from '../TableSort';

const columns = [
  {
    Header: <TableSort name="transaction_date">Дата</TableSort>,
    accessor: 'date',
  },
  {
    Header: <TableSort name="category">Категория</TableSort>,
    accessor: 'category',
  },
  {
    Header: <TableSort name="amount">Сумма</TableSort>,
    accessor: 'amount',
  },
];

export default columns;
