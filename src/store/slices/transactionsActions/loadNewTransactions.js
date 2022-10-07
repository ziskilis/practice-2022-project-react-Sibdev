import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const loadNewTransactions = createAsyncThunk('transactions/loadNewTransactions', async (options) => {
  const responseData = await requestApi.GET(
    `${API_URLS.transactions}?limit=${options.limit || '20'}&offset=${options.offset}`
  );

  return {
    results: responseData.results,
    allFetched: !responseData.next,
  };
});

export default loadNewTransactions;
