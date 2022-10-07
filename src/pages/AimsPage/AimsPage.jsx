import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MainPagesLayout } from 'src/layouts';
import { getAims, getAnalytics } from 'src/store/slices/aimsSlice';
import { getCategories } from 'src/store/slices/categoriesSlice';

import AimsBlock from './AimsBlock';
import Analytics from './Analytics/Analytics';

const AimsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAims());
    dispatch(getAnalytics());
  }, [dispatch]);
  return <MainPagesLayout pageName="Цели" leftColumnChildren={<Analytics />} rightColumnChildren={<AimsBlock />} />;
};

export default AimsPage;
