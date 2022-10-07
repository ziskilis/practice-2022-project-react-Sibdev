import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import { getBalance } from '../transactionsActions';

import getAims from './getAims';

const finishAim = createAsyncThunk('aims/finishAim', async (options, thunkAPI) => {
  const responseData = await requestApi.POST(`${API_URLS.aims}${options.aimId}/finish/`, {
    body: {
      is_closed: true,
    },
  });
  options.callback();
  thunkAPI.dispatch(getAims());
  thunkAPI.dispatch(getBalance());
  return responseData;
});

export default finishAim;
