import React from 'react';
import moment from 'moment';
import { FaEllipsisH } from 'react-icons/fa';
import { CiChat1, CiHeart, CiSaveDown1, CiShare1, CiTrash } from 'react-icons/ci';
import { Post } from '../../interfaces/interfaces';

type PostItemProps = {
  post: Post;
  getUserNameById: (userId: number) => string;
  onEditClick: (post: Post) => void;
  onDeleteClick: (post: Post) => void;
};

export default function PostItem({ post, getUserNameById, onEditClick, onDeleteClick }: PostItemProps) {
  return (
    <div key={post.id} className="post-item bg-white border p-3 rounded mb-3">
      <div className="post-header flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="author font-bold">{getUserNameById(post.user_id)}</span>
          <span className="post-type text-sm text-gray-500">{post.type}</span>
        </div>
        <span className="created-at text-gray-500 text-sm">
          {moment(post.created_at).fromNow()}
        </span>
        <FaEllipsisH className="cursor-pointer" onClick={() => onEditClick(post)} />
      </div>
      <div className="post-content mb-2">{post.content}</div>
      {post.image && post.image.length > 0 && (
        <div className="post-image mb-2">
          <img src={post.image[0]} alt="Post Image" className="w-full rounded" />
        </div>
      )}
      <div className="pl-1 post-reactions text-gray-500 text-sm flex items-center space-x-4">
        <div className='flex items-center space-x-1'>
          <CiHeart className='text-lg' />
          <span>{post.reactions.length}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <CiChat1 className='text-lg cursor-pointer' />
          <span>Comment</span>
        </div>
        <div className='flex items-center space-x-1'>
          <CiShare1 className='text-lg cursor-pointer' />
          <span>Share</span>
        </div>
        <div className='flex items-center space-x-1'>
          <CiSaveDown1 className='text-lg cursor-pointer' />
          <span>Save</span>
        </div>
        <div className='flex items-center space-x-1'>
          <CiTrash className='text-lg cursor-pointer' onClick={() => onDeleteClick(post)} />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
}
