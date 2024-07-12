
// import React, {  useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';
// import { FaUser, FaLock } from 'react-icons/fa';
// import axios from 'axios';

import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { Post } from "../../interfaces/interfaces";

// type Post = {
//   id: number;
//   user_id: number;
//   group_id: number;
//   content: string;
//   image: string[];
//   created_at: string;
//   reactions: any[];
//   type: 'public' | 'private';
// };
// type EditPostModalProps = {
//   isOpen: boolean;
//   handleClose: () => void;
//   post: Post;
//   onPostUpdated: () => void;
// };
// const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, handleClose, post, onPostUpdated }) => {
//     const [postType, setPostType] = useState(post.type);
  
//     const handlePostTypeChange = async () => {
//       try {
//         await axios.patch(`http://localhost:8080/posts/${post.id}`, { type: postType });
//         onPostUpdated();
//         handleClose();
//       } catch (error) {
//         console.error('Error updating post type:', error);
//       }
//     };
  
//     return (
//       <Modal show={isOpen} onHide={handleClose}>
//         <div className="bg-gray-300 rounded-lg">
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Post Type</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group className="mt-4">
//               <Form.Label>Post Type</Form.Label>
//               <div className="mt-2">
//                 <Form.Check
//                   type="radio"
//                   label={
//                     <div className="flex items-center">
//                       <FaUser className="mr-2 text-muted" />
//                       <div>
//                         <div>Public</div>
//                         <Form.Text className="text-muted">
//                           Anyone can view, post, and comment on this post
//                         </Form.Text>
//                       </div>
//                     </div>
//                   }
//                   name="postType"
//                   value="public"
//                   checked={postType === 'public'}
//                   onChange={() => setPostType('public')}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label={
//                     <div className="flex items-center">
//                       <FaLock className="mr-2 text-muted" />
//                       <div>
//                         <div>Private</div>
//                         <Form.Text className="text-muted">
//                           Only approved users can view and comment on this post
//                         </Form.Text>
//                       </div>
//                     </div>
//                   }
//                   name="postType"
//                   value="private"
//                   checked={postType === 'private'}
//                   onChange={() => setPostType('private')}
//                 />
//               </div>
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handlePostTypeChange}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </div>
//       </Modal>
//     );
//   };

//   export default EditPostModal


// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { Post } from '../../interfaces/interfaces';

// type EditPostModalProps = {
//   isOpen: boolean;
//   handleClose: () => void;
//   post: Post;
//   onPostUpdated: () => void;
// };

// export default function EditPostModal({ isOpen, handleClose, post, onPostUpdated }: EditPostModalProps) {
//   const [postType, setPostType] = useState(post.type);

//   const handlePostTypeChange = async () => {
//     try {
//       await axios.patch(`http://localhost:8080/posts/${post.id}`, { type: postType });
//       onPostUpdated();
//       handleClose();
//     } catch (error) {
//       console.error('Error updating post type:', error);
//     }
//   };

//   return (
//     <Modal show={isOpen} onHide={handleClose}>
//       <div className="bg-gray-300 rounded-lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post Type</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mt-4">
//             <Form.Label>Post Type</Form.Label>
//             <div className="mt-2">
//               <Form.Check
//                 type="radio"
//                 label={
//                   <div className="flex items-center">
//                     <FaUser className="mr-2 text-muted" />
//                     <div>
//                       <div>Public</div>
//                       <Form.Text className="text-muted">
//                         Anyone can view, post, and comment on this post
//                       </Form.Text>
//                     </div>
//                   </div>
//                 }
//                 name="postType"
//                 value="public"
//                 checked={postType === 'public'}
//                 onChange={() => setPostType('public')}
//               />
//               <Form.Check
//                 type="radio"
//                 label={
//                   <div className="flex items-center">
//                     <FaLock className="mr-2 text-muted" />
//                     <div>
//                       <div>Private</div>
//                       <Form.Text className="text-muted">
//                         Only approved users can view and comment on this post
//                       </Form.Text>
//                     </div>
//                   </div>
//                 }
//                 name="postType"
//                 value="private"
//                 checked={postType === 'private'}
//                 onChange={() => setPostType('private')}
//               />
//             </div>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handlePostTypeChange}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </div>
//     </Modal>
//   );
// }

type EditPostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  post: Post;
  onPostUpdated: () => void;
};

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, handleClose, post, onPostUpdated }) => {
  const [postType, setPostType] = useState(post.type);
  
  console.log("Modal Open State:", isOpen); // Debugging line
  console.log("Selected Post:", post); // Debugging line

  const handlePostTypeChange = async () => {
    try {
      await axios.patch(`http://localhost:8080/posts/${post.id}`, { type: postType });
      onPostUpdated();
      handleClose();
    } catch (error) {
      console.error('Error updating post type:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <div className="bg-gray-300 rounded-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Post Type</Form.Label>
            <div className="mt-2">
              <Form.Check
                type="radio"
                label={
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-muted" />
                    <div>
                      <div>Public</div>
                      <Form.Text className="text-muted">
                        Anyone can view, post, and comment on this post
                      </Form.Text>
                    </div>
                  </div>
                }
                name="postType"
                value="public"
                checked={postType === 'public'}
                onChange={() => setPostType('public')}
              />
              <Form.Check
                type="radio"
                label={
                  <div className="flex items-center">
                    <FaLock className="mr-2 text-muted" />
                    <div>
                      <div>Private</div>
                      <Form.Text className="text-muted">
                        Only approved users can view and comment on this post
                      </Form.Text>
                    </div>
                  </div>
                }
                name="postType"
                value="private"
                checked={postType === 'private'}
                onChange={() => setPostType('private')}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostTypeChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditPostModal;