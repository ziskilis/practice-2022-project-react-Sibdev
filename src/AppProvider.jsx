import { Provider } from 'react-redux';

import AppRouter from './router';
import store from './store';

const AppProvider = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default AppProvider;
