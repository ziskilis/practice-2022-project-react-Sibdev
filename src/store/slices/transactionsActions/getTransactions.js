import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getTransactions = createAsyncThunk('transactions/getTransactions', async () => {
  const responseData = await requestApi.GET(`${API_URLS.transactions}`);
  return {
    results: responseData.results,
    allFetched: !responseData.next,
  };
});

export default getTransactions;
