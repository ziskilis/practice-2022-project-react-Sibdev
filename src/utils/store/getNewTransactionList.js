/** Функция проверяет, нужно ли добавлять новую транзакцию в текущий стейт или нет */
const getNewTransactionList = (list, newItem, didWeGetAllTransactions) => {
  if (!list.length) return [newItem];
  const transactionDate = new Date(newItem.transaction_date);
  const lastInStateTransactionsDate = new Date(list[list.length - 1].transaction_date);
  const hasToAdd = transactionDate >= lastInStateTransactionsDate || didWeGetAllTransactions;

  if (!hasToAdd) return [...list];

  const newList = [...list];
  const index = list.findIndex((item) => {
    if (item.transaction_date <= newItem.transaction_date) return true;
    return false;
  });
  if (index === -1) return [...list, newItem];
  newList.splice(index, 0, newItem);
  return newList;
};

export default getNewTransactionList;
