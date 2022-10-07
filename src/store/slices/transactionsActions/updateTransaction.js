import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';
import { getNewTransactionList } from 'src/utils/store';

import { getCategories } from '../categoriesSlice';
import { getTotalAmounts } from '../transactionsSlice';

import loadNewTransactions from './loadNewTransactions';

const updateTransaction = createAsyncThunk('transactions/updateTransaction', async (options, thunkAPI) => {
  const body = JSON.stringify(options.data);
  const responseData = await requestApi.PUT(`${API_URLS.transactions}${options.transactionId}`, { body });
  options.callback();
  thunkAPI.dispatch(getCategories());
  thunkAPI.dispatch(getTotalAmounts());

  const transactionsState = thunkAPI.getState().transactions;
  const newList = [...transactionsState.list];
  const index = newList.findIndex((item) => item.id === responseData.id);
  newList.splice(index, 1);
  const finalList = getNewTransactionList(newList, responseData, transactionsState.didWeGetAllTransactions);

  let offset = transactionsState.offset;

  if (finalList.length !== transactionsState.list.length) {
    thunkAPI.dispatch(loadNewTransactions({ limit: 1, offset: transactionsState.offset - 1 }));
    offset -= 1;
  }

  return {
    finalList,
    offset,
  };
});

export default updateTransaction;
