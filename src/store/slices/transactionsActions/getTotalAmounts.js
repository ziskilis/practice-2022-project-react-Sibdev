import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getTotalAmounts = createAsyncThunk('transactions/getTotalAmounts', async (options) => {
  const url = options?.[0]
    ? `${API_URLS.transactions}global/?transaction_date_year=${options[1]}&transaction_date_month=${options[0]}`
    : `${API_URLS.transactions}global/`;
  const responseData = await requestApi.GET(url);

  return responseData;
});

export default getTotalAmounts;
