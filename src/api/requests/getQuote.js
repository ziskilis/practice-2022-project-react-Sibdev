import { API_URLS } from 'src/consts';

import requestApi from '../fetchApi';

const getQuote = async () => {
  const responseData = await requestApi.GET(`${API_URLS.excerptions}random/`);
  return responseData;
};

export default getQuote;
