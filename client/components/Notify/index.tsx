import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Toast } from './Toast';

export const Notify: React.FC = () => {
  const { notify } = useAppSelector((state) => state.notify);

  return (
    <>
      {notify?.success && <Toast severity="success" body={notify.success} />}
      {notify?.errors && <Toast severity="error" body={notify.errors} />}
    </>
  );
};
