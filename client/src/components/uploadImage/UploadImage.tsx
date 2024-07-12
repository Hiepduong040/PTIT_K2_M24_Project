import React, { useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { FaCamera } from 'react-icons/fa';

type UploadImageProps = {
  onUpload: (url: string) => void;
  type: 'avatar' | 'banner' | 'post';
};

export default function UploadImage({ onUpload, type }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${type}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onUpload(downloadURL);
    }
  };

  return (
    <>
      <input 
        type="file" 
        ref={inputRef} 
        style={{ display: 'none' }} 
        onChange={handleImageUpload} 
      />
      <FaCamera 
        className="absolute text-xl text-white hover:text-gray-700 cursor-pointer" 
        onClick={() => inputRef.current?.click()} 
      />
    </>
  );
}
