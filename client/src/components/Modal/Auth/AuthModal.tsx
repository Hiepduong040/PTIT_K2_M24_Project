import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../store/reducers/authModalSlice';
import Modal from 'react-bootstrap/Modal';
import AuthInputs from './AuthInputs';
import { RootState } from '../../../store/store';

interface AuthModalProps {
  children?: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const { open, view } = useSelector((state: RootState) => state.authModal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal
      className="mt-20"
      show={open}
      onHide={handleClose}
      dialogClassName="w-full max-w-md mr-600"
    >
      <Modal.Body className="p-0 h-0">
        <div>
          {view === 'login' || view === 'signup' ? (
            <AuthInputs />
          ) : (
            <div>Reset Password Component</div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}




