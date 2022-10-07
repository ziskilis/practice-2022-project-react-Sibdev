import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getBalance = createAsyncThunk('transactions/getBalance', async () => {
  const responseData = await requestApi.GET(`${API_URLS.transactions}balance/`);

  return responseData;
});

export default getBalance;
