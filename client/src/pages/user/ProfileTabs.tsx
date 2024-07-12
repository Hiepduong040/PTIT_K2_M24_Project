import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

type User = {
  id: number;
  name: string;
  userName: string;
  avatar: string;
  banner: string;
  bio: string;
  friends: { userId: number; add_at: string }[];
};

type FriendRequest = {
  from_user_id: number;
  to_user_id: number;
  status: 'accepted' | 'notFriend' | 'requested';
  id: number;
};

type ProfileTabsProps = {
  user: User;
  friends: User[];
  onUnfriend: (friendId: number) => void;
  onAddFriend: (friendId: number) => void;
  friendRequests: FriendRequest[];
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user, friends, onUnfriend, onAddFriend, friendRequests }) => {
  const [friendStatuses, setFriendStatuses] = useState<{ [key: number]: 'accepted' | 'notFriend' | 'requested' }>({});

  useEffect(() => {
    const initialStatuses = friends.reduce((acc, friend) => {
      acc[friend.id] = 'accepted';
      return acc;
    }, {} as { [key: number]: 'accepted' | 'notFriend' | 'requested' });

    friendRequests.forEach(request => {
      if (request.from_user_id === user.id) {
        initialStatuses[request.to_user_id] = request.status;
      }
    });

    setFriendStatuses(initialStatuses);
  }, [friends, friendRequests, user.id]);

  const handleUnfriend = (friendId: number) => {
    onUnfriend(friendId);
    setFriendStatuses({ ...friendStatuses, [friendId]: 'notFriend' });
  };

  const handleAddFriend = (friendId: number) => {
    onAddFriend(friendId);
    setFriendStatuses({ ...friendStatuses, [friendId]: 'requested' });
  };

  return (
    <Tabs defaultActiveKey="introduction" id="profile-tabs">
      <Tab eventKey="introduction" title="Giới thiệu">
        <div className="p-4 absolute right-10 ">
          <h4 className='mt-10 mr-10'>{user.name}</h4>
          <p>{user.bio}</p>
        </div>
      </Tab>
      <Tab eventKey="friends" title="Bạn bè">
        <div className="p-4">
          {friends.length > 0 ? (
            friends.map(friend => (
              <div key={friend.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={friend.avatar || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="ml-2">{friend.name}</span>
                </div>
                <div>
                  {friendStatuses[friend.id] === 'accepted' && (
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                      onClick={() => handleUnfriend(friend.id)}
                    >
                      Hủy kết bạn
                    </button>
                  )}
                  {friendStatuses[friend.id] === 'notFriend' && (
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => handleAddFriend(friend.id)}
                    >
                      Thêm bạn bè
                    </button>
                  )}
                  {friendStatuses[friend.id] === 'requested' && (
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                      disabled
                    >
                      Request Sent
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Bạn không có bạn bè nào.</p>
          )}
        </div>
      </Tab>
      <Tab eventKey="photos" title="Ảnh">
       
      </Tab>
      <Tab eventKey="videos" title="Video">
       
      </Tab>
      <Tab eventKey="reels" title="Reels">
       
      </Tab>
      <Tab eventKey="more" title="Xem thêm">
       
      </Tab>
    </Tabs>
  );
};

export default ProfileTabs;
