import { API_URLS } from 'src/consts';
import { errorTexts } from 'src/utils/common';
import { setTokens } from 'src/utils/requests';

import requestApi from '../fetchApi';

/**
 * @callback reqCallback
 * @param {Object} res
 */

/**
 * @callback errorCallback
 * @param {Object} error
 */

/**
 *
 * @param {{ email: string, password: string }} credentials
 * @param {reqCallback} callback
 * @param {errorCallback} errorHandler
 */
const auth = async (credentials, callback, errorHandler) => {
  requestApi
    .POST(`${API_URLS.auth}token/obtain/`, {
      body: credentials,
    })
    .then((res) => {
      setTokens(res);
      callback(res);
    })
    .catch((error) => {
      if (error.status === 401) {
        errorHandler(errorTexts.INVALID_CREDENTIALS);
        return;
      }
      if (error?.details?.detail) errorHandler(error.details.detail);
    });
};

export default auth;
