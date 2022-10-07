import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import { getCategories } from '../categoriesSlice';
import { getTotalAmounts } from '../transactionsSlice';

const addNewTransaction = createAsyncThunk('transactions/addNewTransaction', async (options, thunkAPI) => {
  const body = JSON.stringify(options.data);
  const responseData = await requestApi.POST(API_URLS.transactions, { body });
  options.callback();
  thunkAPI.dispatch(getCategories());
  thunkAPI.dispatch(getTotalAmounts());
  return responseData;
});

export default addNewTransaction;
