import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UploadImage from '../../../components/uploadImage/UploadImage'; // Adjust path as needed

type EditProfileModalProps = {
  show: boolean;
  handleClose: () => void;
  user: any;
  handleSave: (updates: any) => void;
};

export default function ProfileUserModal({ show, handleClose, user, handleSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    userName: user.userName,
    bio: user.bio,
    password: '',
    confirmPassword: '',
    avatar: user.avatar,
    banner: user.banner
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string, type: 'avatar' | 'banner') => {
    setFormData({ ...formData, [type]: url });
  };

  const handleSubmit = () => {
    // Perform validation if needed
    handleSave(formData);
  };

  return (
    <Modal  show={show} onHide={handleClose}>
        <div  className='bg-gray-300 rounded-lg'>
        <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <div className='flex justify-around  '>
            <Form.Group controlId="formBanner">
                <Form.Label>Banner</Form.Label>
                <UploadImage
                  onUpload={(url) => handleImageUpload(url, 'banner')}
                  type="banner"
                
                />
            </Form.Group>
            <Form.Group controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                
                <UploadImage
                onUpload={(url) => handleImageUpload(url, 'avatar')}
                type="avatar"
              />
            </Form.Group>
          </div>

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
        </div>
      
    </Modal>
  );
}
