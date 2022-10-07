import { createSlice } from '@reduxjs/toolkit';

import { getUserInfo } from './userActions';

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

const { clearUser } = userSlice.actions;

export { clearUser, getUserInfo };

export default userSlice.reducer;
