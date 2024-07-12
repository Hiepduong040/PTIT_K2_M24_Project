import React, { useRef, useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { User } from "../../interfaces/interfaces";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import axios from 'axios';
import UploadImage from '../uploadImage/UploadImage';

const formTabs = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll }
];

export type TabItem = { title: string };

type NewPostFormProps = {
  communityId: number;
  communityImageURL?: string;
  user: User;
};

export default function NewPostForm({ communityId, communityImageURL, user }: NewPostFormProps) {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({ title: "", body: "" });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const { title } = textInputs;
      const imageURLs: string[] = [];

      for (const file of selectedFiles) {
        const imageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageURLs.push(url);
      }

      const newPost = {
        user_id: user.id,
        group_id: communityId,
        content: title,
        image: imageURLs,
        reactions: [],
        created_at: new Date().toISOString()
      };

      await axios.post("http://localhost:8080/posts", newPost);

      setTextInputs({ title: "", body: "" });
      setSelectedFiles([]);
      setLoading(false);
    } catch (error) {
      console.log("createPost error", error);
      setError("Error creating post");
      setLoading(false);
    }
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) setSelectedFiles(Array.from(files));
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col bg-white rounded-md mt-2">
      <Nav variant="tabs" className="w-full nav nav-tabs px-2">
        {formTabs.map((item, index) => (
          <Nav.Item key={index} className="flex-1 text-center">
            <Nav.Link
              active={item.title === selectedTab}
              onClick={() => setSelectedTab(item.title)}
              className={`flex items-center justify-center py-2 ${item.title === selectedTab ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <item.icon className={`mr-2 text-xl ${item.title === selectedTab ? 'text-blue-500' : 'text-gray-500'}`} />
              {item.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className="p-4">
        {selectedTab === "Post" && (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={textInputs.title}
                onChange={onTextChange}
              />
            </Form.Group>
            <Button onClick={handleCreatePost} disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        )}
        {selectedTab === "Images" && (
          <div>
            <input
              type="file"
              ref={selectFileRef}
              onChange={onSelectImage}
              style={{ display: "none" }}
              multiple
            />
            <Button onClick={() => selectFileRef.current?.click()}>Upload</Button>
            {selectedFiles.length > 0 && (
              <div>
                {selectedFiles.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
                <Button onClick={() => setSelectedFiles([])}>Remove All</Button>
              </div>
            )}
          </div>
        )}
        {selectedTab === "Link" && (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="URL"
                name="url"
                onChange={onTextChange}
              />
            </Form.Group>
            <Button onClick={handleCreatePost} disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        )}
        {selectedTab === "Poll" && (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Question"
                name="question"
                onChange={onTextChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Option 1"
                name="option1"
                onChange={onTextChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Option 2"
                name="option2"
                onChange={onTextChange}
              />
            </Form.Group>
            <Button onClick={handleCreatePost} disabled={loading}>
              {loading ? "Creating..." : "Create Poll"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}




//*****************************************************************************************************************************************/


// test bug



