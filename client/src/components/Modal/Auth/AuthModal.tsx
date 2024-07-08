import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, setView } from '../../../store/reducers/authModalSlice';
import Modal from 'react-bootstrap/Modal';

interface AuthModalProps {
    children: ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
    const { open, view } = useSelector((state: any) => state.authModal);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());

    return (
        <Modal
            className="mt-20 pt-60"
            show={open}
            onHide={handleClose}
            dialogClassName="w-full max-w-md mr-600"
        >
            <Modal.Body className="p-0 h-0">
                <div>
                    {view === 'login' || view === 'signup' ? (
                        <>
                            {children}
                        </>
                    ) : (
                        <div>Reset Password Component</div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
