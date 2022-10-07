import { Text } from 'src/components';

import styles from './CategoriesTableHeader.module.scss';

const CategoriesTableHeader = () => {
  return (
    <div className={styles.wrapper}>
      <Text as="h3" color="default" weight={400} size={'xs'}>
        Расходы по категориям
      </Text>
    </div>
  );
};

export default CategoriesTableHeader;
