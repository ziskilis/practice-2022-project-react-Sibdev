import { createSlice } from '@reduxjs/toolkit';

import { addNewCategory, getCategories } from './categoriesActions';

const initialState = {
  areCategoriesWereFetched: false,
  list: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.list = action.payload.sort((a, b) => Number(b.transactions_sum) - Number(a.transactions_sum));
      state.areCategoriesWereFetched = true;
    },
  },
});

const { clearCategories } = categoriesSlice.actions;

export { addNewCategory, clearCategories, getCategories };

export default categoriesSlice.reducer;
