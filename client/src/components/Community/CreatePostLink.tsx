import React, { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import CreateUserPostModal from "../Modal/PostModal/CreateUserPostModal ";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function CreatePostLink() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handlePostCreated = () => {
    // Refresh or update the post list here
  };

  return (
    <>
      {user ? (
        <div className="flex justify-evenly items-center bg-white h-14 rounded border border-gray-300 p-2 mb-4">
          <FaReddit className="text-gray-300 text-3xl mr-4 cursor-pointer" onClick={() => setIsModalOpen(true)} />
          <input
            type="text"
            placeholder="Create Post"
            className="text-sm bg-gray-100 border border-gray-300 rounded p-2 flex-grow"
            onClick={() => setIsModalOpen(true)}
          />
          <IoImageOutline className="text-gray-400 text-2xl mr-4 cursor-pointer" onClick={() => setIsModalOpen(true)} />
          <BsLink45Deg className="text-gray-400 text-2xl cursor-pointer" onClick={() => setIsModalOpen(true)} />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-white h-14 rounded border border-gray-300 p-2 mb-4">
          <span className="text-gray-500">Please log in to create a post.</span>
        </div>
      )}
      {user && (
        <CreateUserPostModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          userId={user.id}
          onPostCreated={handlePostCreated}
        />
      )}
    </>
  );
}



