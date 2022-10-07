import { storage } from 'src/api';

const setTokens = (tokens) => {
  storage.SET('access', tokens.access, 'temp');
  storage.SET('refresh', tokens.refresh, 'const');
};

export default setTokens;
