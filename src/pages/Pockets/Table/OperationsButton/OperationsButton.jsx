import { useState } from 'react';

import { Popover } from 'src/components';

import styles from './OperationsButton.module.scss';
import TableItemButtons from './TableItemButtons';

const OperationsButton = ({ item }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(!isOpened);
  const handleClose = () => setIsOpened(false);
  return (
    <Popover isOpened={isOpened} handleClose={handleClose} content={<TableItemButtons item={item} />}>
      <button className={styles.operationsButton} onClick={toggleOpen}>
        <span>...</span>
      </button>
    </Popover>
  );
};
export default OperationsButton;
