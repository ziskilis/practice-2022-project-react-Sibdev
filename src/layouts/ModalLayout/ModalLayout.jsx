import { useRef, useEffect } from 'react';

import { CrossIcon } from 'src/assets/icons';
import { Box, Button, Text } from 'src/components';

import styles from './ModalLayout.module.scss';

/** Принимает функцию закрытия модального окна, объект со свойствами модального окна и дочерний элемент */
const ModalLayout = ({ title, handleClose, children }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const { current } = contentRef;
    if (!current) return;

    const clickHandler = (event) => {
      if (current.contains(event.target)) return;
      handleClose();
    };

    document.addEventListener('pointerdown', clickHandler);
    return () => document.removeEventListener('pointerdown', clickHandler);
  }, [handleClose]);

  return (
    <div className={styles.wrapper}>
      <div ref={contentRef} className={styles.layout}>
        <div className={styles.closeButton}>
          <Button variant="ghost" onClick={handleClose}>
            <CrossIcon />
          </Button>
        </div>
        {!!title && (
          <Box pt={48} pb={32}>
            <Text as="h2" size="xxl" color="white" align="center">
              {title}
            </Text>
          </Box>
        )}
        <div onClick={(event) => event.stopPropagation()} className={styles.childrenWrapper}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
