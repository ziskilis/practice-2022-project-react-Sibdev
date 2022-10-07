import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getUserInfo = createAsyncThunk('transactions/getUserInfo', async () => {
  const responseData = await requestApi.GET(`${API_URLS.users}me/`);

  return responseData;
});

export default getUserInfo;
