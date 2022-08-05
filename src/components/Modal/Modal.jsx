import { useEffect, useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseBtn } from 'images/close-20.svg';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log(e.code);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log('Кликнули по бекдропу');
      onClose();
    }
  };

  return createPortal(
    <div className={s.Backdrop} onClick={handleBackdropClick}>
      <div className={theme === themes.light ? s.Modal : s.ModalDark}>
        <button
          type="button"
          className={theme === themes.light ? s.CloseBtn : s.CloseBtnDark}
          onClick={onClose}
        >
          <CloseBtn />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
