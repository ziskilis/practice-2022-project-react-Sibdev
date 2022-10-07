import { API_URLS } from 'src/consts';

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
 * @param {{ username: string, email: string, password: string }} userData
 * @param {reqCallback} callback
 * @param {errorCallback} handleError
 */
const register = (userData, callback, handleError) => {
  requestApi
    .POST(`${API_URLS.auth}register/`, {
      body: userData,
    })
    .then((res) => callback(res))
    .catch((error) => handleError(error.details));
};

export default register;
