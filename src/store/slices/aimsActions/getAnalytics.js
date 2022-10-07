import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getAnalytics = createAsyncThunk('aims/getAnalytics', async () => {
  const responseData = await requestApi.GET(`${API_URLS.aims}analytics/`);
  return responseData;
});

export default getAnalytics;
