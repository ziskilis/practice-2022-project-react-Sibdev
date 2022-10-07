import { API_URLS } from 'src/consts';
import { errorTexts } from 'src/utils/common';
import { setTokens } from 'src/utils/requests';

import { logoutObserver } from '../observers';
import storage from '../storage';

/**
 * @callback errorCallback
 * @param {Object} error
 */

/**
 *
 * @param {errorCallback} errorHandler
 */

const refresh = async (errorHandler) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = storage.GET('refresh');

  if (!refreshToken) {
    logoutObserver.notify();
    throw new errorHandler(errorTexts.TOKEN_NOT_FOUND);
  }
  const response = await fetch(`${BASE_URL}${API_URLS.auth}token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!response.ok) {
    storage.DELETE('access');
    storage.DELETE('refresh');
    logoutObserver.notify();
    throw new errorHandler('Неизвестная ошибка', response);
  }
  const data = await response.json();
  setTokens(data);
};

export default refresh;
