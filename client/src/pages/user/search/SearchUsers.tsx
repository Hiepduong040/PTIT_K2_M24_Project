import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

type User = {
  id: number;
  userName: string;
  avatar: string;
};

type FriendRequest = {
  id: number;
  from_user_id: number;
  to_user_id: number;
  status: string;
  created_at: string;
};

type SearchUsersProps = {
  searchTerm: string;
  users: User[];
  friendRequests: FriendRequest[];
  userId: number;
  onAddFriend: (toUserId: number) => void;
  onCancelRequest: (requestId: number) => void;
};

export default function SearchUsers({ searchTerm, users, friendRequests, userId, onAddFriend, onCancelRequest }: SearchUsersProps) {
  const getFriendRequestStatus = (toUserId: number) => {
    const request = friendRequests.find(request => request.from_user_id === userId && request.to_user_id === toUserId);
    return request ? request : null;
  };

  const filteredUsers = users.filter(user => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2 className="text-2xl mb-4">Users matching "{searchTerm}"</h2>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => {
          const friendRequest = getFriendRequestStatus(user.id);
          return (
            <div className='flex flex-col justify-center mt-[100px] px-[150px] ml-[500px]'>
                <div key={user.id} className="px-10 py-10 rounded-xl mb-3 shadow-sm bg-orange-400">
                    <div className="card-body d-flex align-items-center">
                    <img src={user.avatar} alt={user.userName} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                    <div className="flex-grow-1">
                    <h5 className="card-title mb-0">{user.userName}</h5>
                </div>
                {friendRequest ? (
                  <Button variant="danger" onClick={() => onCancelRequest(friendRequest.id)}>
                    Cancel Request
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => onAddFriend(user.id)}>
                    Add Friend
                  </Button>
                )}
              </div>
            </div>
           
            </div>
          );
        })
      ) : (
        <p>No users found matching "{searchTerm}".</p>
      )}
    </div>
  );
}
