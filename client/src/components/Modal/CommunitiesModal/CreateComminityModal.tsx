import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaUser, FaEye, FaLock } from "react-icons/fa";
import { CreateCommunityModalProps } from "../../../interfaces/interfaces";
import { fetchGroups, createGroup } from '../../../services/group.services';

export default function CreateCommunityModal({ isOpen, handleClose, userId, onGroupCreated }: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [nameError, setNameError] = useState("");
  const [communityType, setCommunityType] = useState("public");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateCommunity = async () => {
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(name) || name.length < 3) {
      return setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    setLoading(true);
    try {
      const groups = await fetchGroups();
      const groupExists = groups.some((group: any) => group.groupName === name);

      if (groupExists) {
        setNameError(`Sorry, /r/${name} is taken. Try another.`);
        setLoading(false);
        return;
      }

      const newGroup = {
        id: Date.now(),
        groupName: name,
        group_picture: "",
        banner: "",
        bio: "",
        privacyType: communityType,
        members: [
          {
            userId: Number(userId),  // Convert userId to number
            join_at: new Date().toISOString(),
          },
        ],
        created_at: new Date().toISOString(),
      };

      await createGroup(newGroup);
      
      setName("");
      setCharsRemaining(21);
      setCommunityType("public");
      onGroupCreated(); // Call the callback to refresh the group list
      handleClose();
    } catch (error: any) {
      setNameError(error.message);
    }
    setLoading(false);
  };

  const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a community</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Text muted>
              Community names including capitalization cannot be changed
            </Form.Text>
            <InputGroup>
              <InputGroup.Text>r/</InputGroup.Text>
              <FormControl
                type="text"
                value={name}
                onChange={handleChange}
                maxLength={21}
              />
            </InputGroup>
            <Form.Text
              className={`d-block mt-1 ${
                charsRemaining === 0 ? "text-danger" : "text-muted"
              }`}
            >
              {charsRemaining} Characters remaining
            </Form.Text>
            {nameError && (
              <Form.Text className="text-danger">{nameError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Community Type</Form.Label>
            <div className="mt-2">
              <Form.Check
                type="radio"
                label={
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-muted" />
                    <div>
                      <div>Public</div>
                      <Form.Text className="text-muted">
                        Anyone can view, post, and comment to this community
                      </Form.Text>
                    </div>
                  </div>
                }
                name="public"
                checked={communityType === "public"}
                onChange={onCommunityTypeChange}
              />
              <Form.Check
                type="radio"
                label={
                  <div className="flex items-center">
                    <FaEye className="mr-2 text-muted" />
                    <div>
                      <div>Restricted</div>
                      <Form.Text className="text-muted">
                        Anyone can view this community, but only approved users
                        can post
                      </Form.Text>
                    </div>
                  </div>
                }
                name="restricted"
                checked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              />
              <Form.Check
                type="radio"
                label={
                  <div className="flex items-center">
                    <FaLock className="mr-2 text-muted" />
                    <div>
                      <div>Private</div>
                      <Form.Text className="text-muted">
                        Only approved users can view and submit to this
                        community
                      </Form.Text>
                    </div>
                  </div>
                }
                name="private"
                checked={communityType === "private"}
                onChange={onCommunityTypeChange}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateCommunity}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Community"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

