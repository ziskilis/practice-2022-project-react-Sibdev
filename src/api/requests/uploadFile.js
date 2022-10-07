import { storage } from 'src/api';
import { API_URLS } from 'src/consts';
const uploadFile = async (file) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const accessToken = storage.GET('access');
  const authHeader = {
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(`${BASE_URL}${API_URLS.transactions}upload/`, {
    method: 'POST',
    headers: {
      ...authHeader,
    },
    body: file,
  });
};

export default uploadFile;
