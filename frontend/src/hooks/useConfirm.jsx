import { useState } from 'react';

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'info'
  });

  const showConfirm = ({ title, message, onConfirm, type = 'info' }) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  };

  const hideConfirm = () => {
    setConfirmState(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm();
    }
    hideConfirm();
  };

  return {
    confirmState,
    showConfirm,
    hideConfirm,
    handleConfirm
  };
};