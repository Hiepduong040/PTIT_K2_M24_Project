import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SearchUsers from './search/SearchUsers';
import SearchPosts from './search/SearchPosts';
import SearchCommunities from './search/SearchCommunities';

type User = {
  id: number;
  userName: string;
  avatar: string;
};

type Post = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
};

type Community = {
  id: number;
  name: string;
  description: string;
};

type FriendRequest = {
  id: number;
  from_user_id: number;
  to_user_id: number;
  status: string;
  created_at: string;
};

export default function SearchResults() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'users' | 'posts' | 'communities'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8080/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:8080/posts');
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchCommunities = async () => {
      try {
        const communitiesResponse = await axios.get('http://localhost:8080/communities');
        setCommunities(communitiesResponse.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const friendRequestsResponse = await axios.get('http://localhost:8080/friend_requests');
        setFriendRequests(friendRequestsResponse.data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchUsers();
    fetchPosts();
    fetchCommunities();
    fetchFriendRequests();
  }, []);

  const handleAddFriend = async (toUserId: number) => {
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is undefined');
      return;
    }

    const newRequest: FriendRequest = {
      from_user_id: user.id,
      to_user_id: toUserId,
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

  const handleCancelRequest = async (requestId: number) => {
    try {
      await axios.delete(`http://localhost:8080/friend_requests/${requestId}`);
      setFriendRequests(friendRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error canceling friend request:', error);
    }
  };

  const usersDict = users.reduce((acc, user) => {
    acc[user.id] = user.userName;
    return acc;
  }, {} as { [key: number]: string });

  return (
    <div className="container">
      <div className='flex flex-col justify-center mt-[100px] px-[50px] ml-[300px]'>
        <div className="search-filter-buttons my-4">
          <Button variant="primary" onClick={() => setFilter('all')}>All</Button>
          <Button variant="secondary" onClick={() => setFilter('users')}>Users</Button>
          <Button variant="secondary" onClick={() => setFilter('posts')}>Posts</Button>
          <Button variant="secondary" onClick={() => setFilter('communities')}>Communities</Button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filter === 'all' && (
          <>
            <SearchUsers
              searchTerm={searchTerm}
              users={users}
              friendRequests={friendRequests}
              userId={user ? user.id : -1}
              onAddFriend={handleAddFriend}
              onCancelRequest={handleCancelRequest}
            />
            <SearchPosts
              searchTerm={searchTerm}
              posts={posts}
              users={usersDict}
            />
            <SearchCommunities
              searchTerm={searchTerm}
              communities={communities}
            />
          </>
        )}
        {filter === 'users' && (
          <SearchUsers
            searchTerm={searchTerm}
            users={users}
            friendRequests={friendRequests}
            userId={user ? user.id : -1}
            onAddFriend={handleAddFriend}
            onCancelRequest={handleCancelRequest}
          />
        )}
        {filter === 'posts' && (
          <SearchPosts
            searchTerm={searchTerm}
            posts={posts}
            users={usersDict}
          />
        )}
        {filter === 'communities' && (
          <SearchCommunities
            searchTerm={searchTerm}
            communities={communities}
          />
        )}
      </div>
    </div>
  );
}
