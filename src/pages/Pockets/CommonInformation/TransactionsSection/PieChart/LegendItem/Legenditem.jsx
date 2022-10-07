import styles from './LegendItem.module.scss';

const LegendItem = ({ color, label }) => {
  return (
    <div className={styles.itemWrapper}>
      <div style={{ backgroundColor: color }} className={styles.colorItem}></div>
      <div>{label}</div>
    </div>
  );
};
export default LegendItem;
