import { createSlice } from '@reduxjs/toolkit';

import {
  addNewAim,
  deleteAim,
  finishAim,
  getAimById,
  getAims,
  getAnalytics,
  getTopAims,
  updateAim,
  topUpAim,
} from './aimsActions';

const initialState = {
  areAimsWereFetched: false,
  list: [],
  analytics: [],
  topAims: [],
};

export const aimsSlice = createSlice({
  name: 'aims',
  initialState,
  reducers: {
    clearAims: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [deleteAim.fulfilled]: (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    [getAims.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.areAimsWereFetched = true;
    },
    [getAnalytics.fulfilled]: (state, action) => {
      state.analytics = action.payload;
    },
    [getTopAims.fulfilled]: (state, action) => {
      state.topAims = action.payload;
    },
  },
});

const { clearAims } = aimsSlice.actions;

export {
  addNewAim,
  deleteAim,
  clearAims,
  finishAim,
  getAimById,
  getAims,
  getAnalytics,
  getTopAims,
  updateAim,
  topUpAim,
};

export default aimsSlice.reducer;
