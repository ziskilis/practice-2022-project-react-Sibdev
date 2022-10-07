import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

const getTopAims = createAsyncThunk('aims/getTopAims', async () => {
  const responseData = await requestApi.GET(`${API_URLS.aims}top-targets/`);
  return responseData;
});

export default getTopAims;
