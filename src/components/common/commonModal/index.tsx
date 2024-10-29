import React from 'react';
import Modal from 'react-modal';

type ModalProps = {
  children?: React.ReactNode;
  isopen: boolean;
  onRequestClose: () => void;
  style: ReactModal.Styles;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
};

const CommnModal = ({
  children,
  isopen,
  onRequestClose,
  style,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isopen}
      style={style}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnEsc}
    >
      {children}
    </Modal>
  );
};

export default CommnModal;
