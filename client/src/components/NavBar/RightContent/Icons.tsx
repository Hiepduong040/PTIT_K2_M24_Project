
import React from "react";
import { BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";

export default function ActionIcons() {
  return (
    <div className="flex items-center flex-grow">
      <div className="hidden md:flex items-center border-r border-gray-200">
        <div className="flex mr-1.5 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <div className="bi bi-arrow-up-right-circle text-xl" />
        </div>
        <div className="flex mr-1.5 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <div className="bi bi-funnel text-xl" />
        </div>
        <div className="flex mr-1.5 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <div className="bi bi-camera-video text-xl" />
        </div>
      </div>
      <div className="flex">
        <div className="flex mr-1.5 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <BsChatDots className="text-xl" />
        </div>
        <div className="flex mr-1.5 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <div className="bi bi-bell text-xl" />
        </div>
        <div className="hidden md:flex mr-3 ml-1.5 p-1 cursor-pointer rounded hover:bg-gray-200">
          <GrAdd className="text-xl" />
        </div>
      </div>
    </div>
  );
}

