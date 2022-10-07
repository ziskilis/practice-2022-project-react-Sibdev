import { useRef, useEffect } from 'react';

import styles from './Popover.module.scss';

const Popover = ({ isOpened, content, children, handleClose }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const { current } = popoverRef;
    if (!current) return;
    const handlePopoverClose = (event) => {
      if (current.contains(event.target)) return;
      handleClose();
    };

    document.addEventListener('click', handlePopoverClose);
    return () => document.removeEventListener('click', handlePopoverClose);
  }, [handleClose]);

  return (
    <div ref={popoverRef} className={styles.wrapper}>
      {children}
      {isOpened && <div className={styles.contentWrapper}>{content}</div>}
    </div>
  );
};

export default Popover;
