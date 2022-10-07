import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const sortTransactions = createAsyncThunk('transactions/sortTransactions', async (options, thunkAPI) => {
  const [name, sortType] = options;
  const reqURL = sortType === 'desc' ? `${API_URLS.transactions}` : `${API_URLS.transactions}?sort_by=${name}`;
  const responseData = await requestApi.GET(reqURL);
  return {
    results: responseData.results,
    allFetched: !responseData.next,
    sortType: sortType,
    name: name,
  };
});

export default sortTransactions;
