

import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

interface AdminUserHeaderProps {
  onSearch: (searchTerm: string) => void;
}

export default function AdminUserHeader({ onSearch }: AdminUserHeaderProps) {
  return (
    <div>
      <header className='header'>
        <div className='header-left flex items-center'>
          <BsSearch className='icon mr-2' />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="input-search"
            onChange={(e) => onSearch(e.target.value)} //
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
