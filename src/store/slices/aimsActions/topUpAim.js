import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import { getBalance } from '../transactionsActions';

import getAims from './getAims';

const topUpAim = createAsyncThunk('aims/topUpAim', async (options, thunkAPI) => {
  try {
    await requestApi.POST(`${API_URLS.aims}${options.aimId}/invest/`, {
      body: { amount: options.amount },
    });
    options.callback();
    options.success();
    thunkAPI.dispatch(getAims());
    thunkAPI.dispatch(getBalance());
  } catch {
    options.callback();
    options.error();
  }
});

export default topUpAim;
