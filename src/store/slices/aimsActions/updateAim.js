import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import getAims from './getAims';

const updateAim = createAsyncThunk('aims/updateAim', async (options, thunkAPI) => {
  const body = JSON.stringify(options.data);
  const responseData = await requestApi.PATCH(`${API_URLS.aims}${options.aimId}`, { body });
  options.callback();
  thunkAPI.dispatch(getAims());
  return responseData;
});

export default updateAim;
