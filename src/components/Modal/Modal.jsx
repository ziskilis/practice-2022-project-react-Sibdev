import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalLayout } from 'src/layouts';

const Modal = ({ title, isOpened, children, handleClose }) => {
  const containerRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (!isOpened) return;
    const { current } = containerRef;
    if (!current) return undefined;

    document.body.appendChild(current);

    return () => current.remove();
  }, [isOpened]);

  if (!isOpened) return null;

  return createPortal(
    <ModalLayout title={title} handleClose={handleClose}>
      {children}
    </ModalLayout>,
    containerRef.current
  );
};

export default Modal;
