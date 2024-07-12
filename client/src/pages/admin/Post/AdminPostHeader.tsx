import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

interface AdminPostHeaderProps {
  onSearch: (searchTerm: string) => void;
}

export default function AdminPostHeader({ onSearch }: AdminPostHeaderProps) {
  return (
    <div>
      <header className='header'>
        <div className='header-left flex items-center'>
          <BsSearch className='icon mr-2' />
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="input-search"
            onChange={(e) => onSearch(e.target.value)} // Gọi hàm onSearch khi nhập liệu
          />
        </div>
        <div className='header-right'>
          <BsFillBellFill className='icon' />
          <BsFillEnvelopeFill className='icon' />
          <BsPersonCircle className='icon' />
        </div>
      </header>
    </div>
  );
}
