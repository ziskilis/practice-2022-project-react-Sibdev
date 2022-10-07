import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import getAims from './getAims';

const addNewAim = createAsyncThunk('aims/addNewAim', async (options, thunkAPI) => {
  const body = JSON.stringify(options.data);
  const responseData = await requestApi.POST(API_URLS.aims, { body });
  thunkAPI.dispatch(getAims());
  options.callback();
  return responseData;
});

export default addNewAim;
