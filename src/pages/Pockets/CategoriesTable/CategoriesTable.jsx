import styles from './CategoriesTable.module.scss';
import CategoriesTableBody from './CategoriesTableBody';
import CategoriesTableHeader from './CategoriesTableHeader';

const CategoriesTable = () => {
  return (
    <div className={styles.wrapper}>
      <CategoriesTableHeader />
      <CategoriesTableBody />
    </div>
  );
};

export default CategoriesTable;
