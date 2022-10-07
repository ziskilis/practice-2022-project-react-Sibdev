import { configureStore } from '@reduxjs/toolkit';

import { aimsReducer, categoriesReducer, transactionsReducer, userReducer } from './slices';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
    user: userReducer,
    aims: aimsReducer,
  },
});

export default store;
