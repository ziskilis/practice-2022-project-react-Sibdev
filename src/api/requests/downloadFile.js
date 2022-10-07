import { storage } from 'src/api';
import { API_URLS } from 'src/consts';
const downloadFile = async () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const accessToken = storage.GET('access');
  const authHeader = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await fetch(`${BASE_URL}${API_URLS.transactions}export/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  });
  if (response.status === 200) {
    let reader = new FileReader();
    const link = document.createElement('a');
    reader.readAsDataURL(await response.blob());
    reader.onload = function () {
      link.href = reader.result;
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
  }
};

export default downloadFile;
