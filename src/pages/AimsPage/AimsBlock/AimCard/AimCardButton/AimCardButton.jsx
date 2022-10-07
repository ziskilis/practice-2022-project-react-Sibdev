import { useState } from 'react';

import { Popover } from 'src/components';

import styles from './AimCardButton.module.scss';
import AimPopupContent from './AimPopupContent';

const AimCardButton = ({ id, aimClosed, handleDeletionOpen }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(!isOpened);
  const handleClose = () => setIsOpened(false);
  return (
    <Popover
      isOpened={isOpened}
      handleClose={handleClose}
      content={<AimPopupContent id={id} handleDeletionOpen={handleDeletionOpen} />}
    >
      {aimClosed ? (
        <div className={styles.aimButtonDisabled}> </div>
      ) : (
        <button className={styles.aimButton} onClick={toggleOpen}>
          <span>...</span>
        </button>
      )}
    </Popover>
  );
};
export default AimCardButton;
