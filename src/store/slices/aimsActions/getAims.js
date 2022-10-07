import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getAims = createAsyncThunk('aims/getAims', async (options) => {
  const url = options?.sortOption
    ? `${API_URLS.aims}?ordering=${options.sortType}${options.sortOption}`
    : `${API_URLS.aims}`;
  const responseData = await requestApi.GET(`${url}`);
  return responseData;
});

export default getAims;
