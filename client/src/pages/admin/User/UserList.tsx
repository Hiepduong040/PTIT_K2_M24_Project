import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import DashboardHeader from './AdminUserHeader';
import SideBarAdmin from '../../../components/SideBar/SideBarAdmin';
import "../admin.css";

type User = {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  status?: boolean;
  created_at: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data);
        setFilteredUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleBanUser = async (user: User) => {
    try {
      await axios.patch(`http://localhost:8080/users/${user.id}`, {
        status: false
      });
      setUsers(users.map(u => u.id === user.id ? { ...u, status: false } : u));
      setFilteredUsers(filteredUsers.map(u => u.id === user.id ? { ...u, status: false } : u));
      setShowModal(false);
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleOpenUser = async (user: User) => {
    try {
      await axios.patch(`http://localhost:8080/users/${user.id}`, {
        status: true
      });
      setUsers(users.map(u => u.id === user.id ? { ...u, status: true } : u));
      setFilteredUsers(filteredUsers.map(u => u.id === user.id ? { ...u, status: true } : u));
    } catch (error) {
      console.error('Error opening user:', error);
    }
  };

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="flex-grow p-4">
        <DashboardHeader onSearch={handleSearch} />
        <h2 className="text-2xl mb-4">Users Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.userName}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <span>{user.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {user.status ? 'ACTIVE' : 'BANNED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="link" 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`page/user/${user.id}`)}
                    >
                      Detail
                    </Button>
                    {user.status ? (
                      <Button 
                        variant="link" 
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                      >
                        Ban
                      </Button>
                    ) : (
                      <Button 
                        variant="link" 
                        className="text-green-500 hover:text-green-700 ml-2"
                        onClick={() => handleOpenUser(user)}
                      >
                        Open
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Ban</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to ban this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => selectedUser && handleBanUser(selectedUser)}>
            Ban
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
