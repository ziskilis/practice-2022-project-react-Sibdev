import styles from './CommonInformation.module.scss';
import TransactionsSection from './TransactionsSection';

const CommonInformation = () => {
  return (
    <div className={styles.wrapper}>
      <TransactionsSection />
    </div>
  );
};

export default CommonInformation;
