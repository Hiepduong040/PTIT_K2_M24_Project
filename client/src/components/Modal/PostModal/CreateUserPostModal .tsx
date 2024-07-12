import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UploadImage from '../../uploadImage/UploadImage';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';

type CreateUserPostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  userId: number;
  onPostCreated: () => void;
};

export default function CreateUserPostModal({
  isOpen,
  handleClose,
  userId,
  onPostCreated,
}: CreateUserPostModalProps) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postType, setPostType] = useState<'public' | 'private'>('public');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handlePostTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostType(e.target.value as 'public' | 'private');
  };

  const handleSubmit = async () => {
    const newPost = {
      user_id: userId,
      content: content,
      image: imageUrl ? [imageUrl] : [],
      created_at: new Date().toISOString(),
      reactions: [],
      type: postType,
    };

    try {
      await axios.post('http://localhost:8080/posts', newPost);
      setContent('');
      setImageUrl('');
      setPostType('public');

      onPostCreated(); // Refresh the post list
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <div className="bg-gray-300 rounded-lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="What's on your mind?"
                value={content}
                onChange={handleContentChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Upload Image</Form.Label>
              <UploadImage onUpload={handleImageUpload} type="post" />
              {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-0 w-100" />}
            </Form.Group>
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
                  onChange={handlePostTypeChange}
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
                  onChange={handlePostTypeChange}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
