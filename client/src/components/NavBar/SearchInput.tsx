import React, { useState, useEffect, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type User = {
  id: number;
  userName: string;
  avatar: string;
};

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full">
        <div className="relative ml-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:ring-gray-500 focus:ring-gray-600 sm:text-sm sm:leading-6"
            placeholder="Search Reddit"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}
