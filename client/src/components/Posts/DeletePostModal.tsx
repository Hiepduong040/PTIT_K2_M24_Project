
// import React from 'react';
// import { Button, Modal } from 'react-bootstrap';
// type DeletePostModalProps = {
//   isOpen: boolean;
//   handleClose: () => void;
//   handleDelete: () => void;
// };
// const DeletePostModal: React.FC<DeletePostModalProps> = ({ isOpen, handleClose, handleDelete }) => (
//     <Modal show={isOpen} onHide={handleClose}>
//       <div className="bg-gray-300 rounded-lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to delete this post?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </div>
//     </Modal>
//   );
//   export default DeletePostModal



import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type DeletePostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

export default function DeletePostModal({ isOpen, handleClose, handleDelete }: DeletePostModalProps) {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <div className="bg-gray-300 rounded-lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
