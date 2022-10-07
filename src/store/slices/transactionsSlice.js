import { createSlice } from '@reduxjs/toolkit';

import { getNewTransactionList } from 'src/utils/store';

import {
  addNewTransaction,
  deleteTransaction,
  getBalance,
  getTotalAmounts,
  getTransactions,
  loadNewTransactions,
  sortTransactions,
  updateTransaction,
} from './transactionsActions';

const initialState = {
  isNewTransactionsPending: false,
  didWeGetAllTransactions: false,
  list: [],
  offset: 0,
  sort: { category: 'none', transaction_date: 'none', amount: 'none' },
  totalIncome: '⸻',
  totalExpenses: '⸻',
  balance: 0,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [getTransactions.fulfilled]: (state, action) => {
      state.list = action.payload.results;
      state.didWeGetAllTransactions = action.payload.allFetched;
      state.offset = action.payload.results.length;
    },
    [addNewTransaction.fulfilled]: (state, action) => {
      const newList = getNewTransactionList([...state.list], action.payload, state.didWeGetAllTransactions);
      state.offset = state.offset + newList.length - state.list.length;
      state.list = newList;
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      const newList = [...state.list];
      const index = newList.findIndex((item) => item.id === action.payload);
      newList.splice(index, 1);
      state.offset -= 1;
      state.list = newList;
    },
    [getBalance.fulfilled]: (state, action) => {
      state.balance = action.payload.balance;
    },
    [updateTransaction.fulfilled]: (state, action) => {
      state.list = action.payload.finalList;
      state.offset = action.payload.offset;
    },
    [loadNewTransactions.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload.results];
      state.didWeGetAllTransactions = action.payload.allFetched;
      state.offset = state.offset + action.payload.results.length;
      state.isNewTransactionsPending = false;
    },
    [loadNewTransactions.pending]: (state) => {
      state.isNewTransactionsPending = true;
    },
    [sortTransactions.fulfilled]: (state, action) => {
      switch (action.payload.sortType) {
        case 'none':
          state.sort = { category: 'none', transaction_date: 'none', amount: 'none' };
          state.sort[action.payload.name] = 'asc';
          state.list = action.payload.results;
          break;
        case 'asc':
          state.sort[action.payload.name] = 'desc';
          state.list = action.payload.results.reverse();
          break;
        default:
          state.sort[action.payload.name] = 'none';
          state.list = action.payload.results;
      }
      state.didWeGetAllTransactions = action.payload.allFetched;
      state.offset = action.payload.results.length;
    },
    [getTotalAmounts.fulfilled]: (state, action) => {
      state.totalIncome = action.payload.total_income;
      state.totalExpenses = action.payload.total_expenses;
    },
  },
});

const { clearTransactions } = transactionsSlice.actions;

export {
  addNewTransaction,
  clearTransactions,
  deleteTransaction,
  getBalance,
  getTotalAmounts,
  getTransactions,
  loadNewTransactions,
  sortTransactions,
  updateTransaction,
};

export default transactionsSlice.reducer;
