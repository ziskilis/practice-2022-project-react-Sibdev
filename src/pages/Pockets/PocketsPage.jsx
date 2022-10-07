import { MainPagesLayout } from 'src/layouts';

import Operations from './Operations';
import Statistic from './Statistic';

const PocketsPage = () => {
  return (
    <MainPagesLayout pageName="Операции" leftColumnChildren={<Statistic />} rightColumnChildren={<Operations />} />
  );
};

export default PocketsPage;
