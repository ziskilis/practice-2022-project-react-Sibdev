import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import { getCategories } from '../categoriesSlice';
import { getTotalAmounts } from '../transactionsSlice';

import loadNewTransactions from './loadNewTransactions';

const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (options, thunkAPI) => {
  await requestApi.DELETE(`${API_URLS.transactions}${options.transactionId}`);
  options.callback();
  thunkAPI.dispatch(getCategories());
  const offset = thunkAPI.getState().transactions.offset - 1;
  thunkAPI.dispatch(loadNewTransactions({ offset, limit: 1 }));
  thunkAPI.dispatch(getTotalAmounts());
  return options.transactionId;
});

export default deleteTransaction;
