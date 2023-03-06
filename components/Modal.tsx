import { useState, useEffect, useLayoutEffect, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/Modal.module.css';
import * as Icons from 'react-icons/fa';
import Link from 'next/link';

interface ModalProps {
  children: React.ReactNode;
  enabled: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = (props: ModalProps) => {
  const { enabled, title, children, onClose } = props;
  const [isBrowser, setIsBrowser] = useState(false);

  const closeModalHandler = (eTarget: MouseEvent) => {
    if (eTarget) {
      eTarget.preventDefault();
    }
    onClose();
  };

  useLayoutEffect(() => {
    const date = new Date();
    console.log('Modal.tsx: useLayoutEffect: date: ', date);
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const date = new Date();
    console.log('Modal.tsx: useEffect: date: ', date);
  }, []);

  const modalContent = enabled ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Link onClick={(e) => closeModalHandler(e)} href="#">
            <Icons.FaTimes />
          </Link>
        </div>
        {title && <h1>{title}</h1>}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    const modalHTML = document.getElementById('modal-root');
    if (modalHTML === null) return null;
    return ReactDOM.createPortal(modalContent, modalHTML);
  } else {
    return null;
  }
};
