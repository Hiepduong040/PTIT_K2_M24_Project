import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';
import { getFriendRequests, acceptFriendRequest, deleteFriendRequest, FriendRequest } from '../../services/friends.services';
import { updateUserProfile } from '../../services/user.services';
import UploadImage from '../../components/uploadImage/UploadImage'; // Adjust path as needed
import ProfileUserModal from '../../components/Modal/Profile/ProfileUserModal'; // Adjust path as needed
import ProfileTabs from './ProfileTabs'; // Adjust path as needed

type User = {
  id: number;
  name: string;
  userName: string;
  avatar: string;
  banner: string;
  bio: string;
  friends: { userId: number; add_at: string }[];
};

export default function ProfileUser() {
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [requestUsers, setRequestUsers] = useState<User[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${loggedInUser.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    const fetchFriends = async () => {
      try {
        const friendRequestsResponse = await axios.get(`http://localhost:8080/friend_requests`);
        const acceptedFriendIds = friendRequestsResponse.data
          .filter((request: { status: string; to_user_id: number }) => request.status === 'accepted' && request.to_user_id === loggedInUser.id)
          .map((request: { from_user_id: number }) => request.from_user_id);
        
        const friendsResponse = await axios.get(`http://localhost:8080/users`, {
          params: { id: acceptedFriendIds }
        });
        setFriends(friendsResponse.data);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const requests = await getFriendRequests(loggedInUser.id);
        setFriendRequests(requests);

        const requestUserIds = requests.map((request: { from_user_id: number; }) => request.from_user_id);
        const requestUsersResponse = await axios.get(`http://localhost:8080/users`, {
          params: { id: requestUserIds }
        });
        setRequestUsers(requestUsersResponse.data);
      } catch (error) {
        console.error('Error fetching friend requests', error);
      }
    };

    fetchUser();
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const handleUpload = async (url: string, type: 'avatar' | 'banner') => {
    if (user) {
      const updates = { [type]: url };
      const updatedUser = await updateUserProfile(user.id, updates);
      setUser(updatedUser);
    }
  };

  const handleAcceptFriendRequest = async (requestId: number, fromUserId: number) => {
    try {
      if (user) {
        await acceptFriendRequest(requestId, fromUserId, user.id);
        const acceptedFriend = requestUsers.find(user => user.id === fromUserId);
        if (acceptedFriend) {
          setFriends([...friends, acceptedFriend]);
        }
        setFriendRequests(friendRequests.filter(request => request.id !== requestId));
      }
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  };

  const handleDeleteFriendRequest = async (requestId: number) => {
    try {
      await deleteFriendRequest(requestId);
      setFriendRequests(friendRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error deleting friend request', error);
    }
  };

  const handleUnfriend = async (friendId: number) => {
    try {
      if (user) {
        const request = friendRequests.find(request => request.from_user_id === friendId && request.to_user_id === user.id);
        if (request) {
          await deleteFriendRequest(request.id);
        }
        setFriends(friends.filter(friend => friend.id !== friendId));
        // You may want to send a request to delete the friendship from the database here
      }
    } catch (error) {
      console.error('Error unfriending user', error);
    }
  };

  const handleAddFriend = async (friendId: number) => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const newRequest: FriendRequest = {
      from_user_id: user.id,
      to_user_id: friendId,
      status: 'requested',
      created_at: new Date().toISOString(),
      id: Date.now()
    };

    try {
      await axios.post('http://localhost:8080/friend_requests', newRequest);
      setFriendRequests([...friendRequests, newRequest]);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const handleSave = async (updates: any) => {
    if (user) {
      const updatedUser = await updateUserProfile(user.id, updates);
      setUser(updatedUser);
      setShowEditModal(false);
    }
  };

  const getRequestUserInfo = (userId: number) => {
    return requestUsers.find(user => user.id === userId) || { name: 'Unknown', avatar: 'https://via.placeholder.com/40' };
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full ml-[120px] px-[300px]">
      <ProfileUserModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        user={user}
        handleSave={handleSave}
      />
      <div className="relative">
        <img
          src={user.banner || 'https://via.placeholder.com/1200x300'}
          alt="Cover"
          className="w-full h-48 md:h-72 object-cover"
        />
        <UploadImage onUpload={(url) => handleUpload(url, 'banner')} type="banner" />
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="relative right-[250px] bottom-[100px]">
          <img
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white"
          />
          <UploadImage  onUpload={(url) => handleUpload(url, 'avatar')} type="avatar" />
        </div>
        <div className='relative bottom-[210px]'>
          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-600">{friends.length} bạn bè</p>
          <div className="flex -space-x-2 mt-2">
            {friends.slice(0, 6).map((friend, index) => (
              <img
                key={index}
                src={friend.avatar || 'https://via.placeholder.com/40'}
                alt={friend.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowEditModal(true)}>
          Chỉnh sửa thông tin
          </button>
        </div>
        
      </div>

      <div className="flex justify-center border-b ">
        <ProfileTabs user={user} friends={friends} onUnfriend={handleUnfriend} onAddFriend={handleAddFriend} friendRequests={friendRequests} />
      </div>

      <div className="mt-8 px-4">
        <div className="mt-4">
          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold" >{user.name} </p>
                <p className="" >Bio: {user.bio} </p>
              </div>
            </div>
          </div>
        </div>

        {friendRequests.length > 0 && (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Yêu cầu kết bạn</h2>
            {friendRequests.filter(request => request.to_user_id === user.id && request.status === 'requested').map(request => {
              const requestUser = getRequestUserInfo(request.from_user_id);
              return (
                <div key={request.id} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={requestUser.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="ml-2">{requestUser.name}</span>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                      onClick={() => handleAcceptFriendRequest(request.id, request.from_user_id)}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => handleDeleteFriendRequest(request.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
