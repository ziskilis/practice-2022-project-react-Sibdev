import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import { getBalance } from '../transactionsActions';

const deleteAim = createAsyncThunk('aims/deleteAim', async (options, thunkAPI) => {
  await requestApi.DELETE(`${API_URLS.aims}${options.aimId}`);
  options.callback();
  options.modal();
  thunkAPI.dispatch(getBalance());
  return options.aimId;
});

export default deleteAim;
