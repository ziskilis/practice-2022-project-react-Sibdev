import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getAimById = createAsyncThunk('aims/getAimById', async (id) => {
  const responseData = await requestApi.GET(`${API_URLS.aims}${id}`);
  return responseData;
});

export default getAimById;
