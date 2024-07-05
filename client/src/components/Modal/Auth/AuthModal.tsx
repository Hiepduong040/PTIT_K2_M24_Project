
// import { useSelector, useDispatch } from 'react-redux';
// import { closeModal, setView } from '../../../store/reducers/authModalSlice';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import AuthInputs from './AuthInputs';  // Import AuthInputs

// const AuthModal = () => {
//   const { open, view } = useSelector((state) => state.authModal);
//   const dispatch = useDispatch();

//   const handleClose = () => dispatch(closeModal());

//   return (
//     <Modal className=' mt-10' show={open} onHide={handleClose}>
//       {/* <Modal.Header closeButton>
//         <Modal.Title>
//           {view === 'login' && ''}
//           {view === 'signup' && ''}
//           {view === 'resetPassword' && 'Reset Password'}
//         </Modal.Title>
//       </Modal.Header>  */}
//       <Modal.Body className=' ' >
//         {/* Nội dung của modal */}
//         <div>
//           {view === 'login' || view === 'signup' ? (
//             <>
//               {/* Các thành phần OAuthButtons và AuthInputs có thể được nhúng tại đây */}
//               <AuthInputs /> {/* Sử dụng AuthInputs để hiển thị Login hoặc SignUp */}
//             </>
//           ) : (
//             <div>Reset Password Component</div>
//           )}
//         </div>
//       </Modal.Body>
//       {/* <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer> */}
//     </Modal>
//   );
// };

// export default AuthModal;

import { useSelector, useDispatch } from 'react-redux';
import { closeModal, setView } from '../../../store/reducers/authModalSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthInputs from './AuthInputs';  // Import AuthInputs

const AuthModal = () => { 
  const { open, view } = useSelector((state:any) => state.authModal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal
      className="mt-10"
      show={open}
      onHide={handleClose}
      dialogClassName="w-full max-w-md mx-auto"
    >
      <Modal.Body className="p-0 h-0">
        {/* Nội dung của modal */}
        <div>
          {view === 'login' || view === 'signup' ? (
            <>
              <AuthInputs /> {/* Sử dụng AuthInputs để hiển thị Login hoặc SignUp */}
            </>
          ) : (
            <div>Reset Password Component</div>
          )}
        </div>
      </Modal.Body>
      {/* <Modal.Footer className="flex justify-end p-4">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AuthModal;
