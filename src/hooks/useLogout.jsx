import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { storage } from 'src/api';
import { PATHNAMES } from 'src/consts';
import { clearAims } from 'src/store/slices/aimsSlice';
import { clearCategories } from 'src/store/slices/categoriesSlice';
import { clearTransactions } from 'src/store/slices/transactionsSlice';
import { clearUser } from 'src/store/slices/userSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(clearTransactions());
    dispatch(clearUser());
    dispatch(clearCategories());
    dispatch(clearAims());

    storage.DELETE('access');

    navigate(PATHNAMES.login);
  };
};

export default useLogout;
