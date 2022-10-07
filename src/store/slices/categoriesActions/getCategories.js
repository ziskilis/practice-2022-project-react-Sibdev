import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getCategories = createAsyncThunk('categories/getCategories', async (options) => {
  const url = !options?.[0]
    ? `${API_URLS.categories}transactions-by-categories/`
    : `${API_URLS.categories}transactions-by-categories/` +
      `?transaction_date_year=${options[1]}&transaction_date_month=${options[0]}`;
  const responseData = await requestApi.GET(url);
  return responseData;
});

export default getCategories;
