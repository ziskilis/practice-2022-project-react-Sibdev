import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestApi } from 'src/api';
import { API_URLS } from 'src/consts';

import getCategories from './getCategories';

const addNewCategory = createAsyncThunk('categories/addNewCategory', async (options, thunkAPI) => {
  const body = JSON.stringify(options);
  const responseData = await requestApi.POST(API_URLS.categories, { body });
  thunkAPI.dispatch(getCategories());
  return responseData;
});

export default addNewCategory;
