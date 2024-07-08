import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/reducers/postSlice";
import { AppDispatch } from "../../store/store";

interface NewPostFormProps {
  communityId: string;
  communityImageURL?: string;
  user: {
    id: string;
    name: string;
  };
}

const NewPostForm: React.FC<NewPostFormProps> = ({ communityId, communityImageURL, user }) => {
  const [textInputs, setTextInputs] = useState({ title: "", body: "" });
  const dispatch = useDispatch<AppDispatch>();

  const handleCreatePost = () => {
    const post = {
      id: `${Date.now()}`, // Assuming you need an id
      communityId,
      communityImageURL: communityImageURL || "",
      creatorId: user.id,
      userDisplayText: user.name,
      title: textInputs.title,
      body: textInputs.body,
      createdAt: new Date().toISOString(),
    };

    dispatch(createPost(post));
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="flex space-x-4">
        <button className="p-2">Post</button>
        <button className="p-2">Images & Video</button>
      </div>
      <div className="p-4">
        <input
          name="title"
          value={textInputs.title}
          onChange={onTextChange}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="body"
          value={textInputs.body}
          onChange={onTextChange}
          placeholder="Text (optional)"
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
