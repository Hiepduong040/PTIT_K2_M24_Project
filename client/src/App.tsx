

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import CommunityNotFound from './components/Community/CommunityNotFound';
import CommunityPage from './pages/community/CommunityPage';
import Home from './pages/community/Home';
import Submit from './pages/submit/Submit';
import UserProfile from './pages/user/ProfileUser';
import AdminDashboard from './pages/admin/Dashbroad/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './pages/user/SearchResults';
import UserList from './pages/admin/User/UserList';
import PostsList from './pages/admin/Post/PostList';
import GroupList from './pages/admin/Group/GroupList';

export default function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="page/:groupName" element={<CommunityPage />} />
          <Route path="page/:groupName/submit" element={<Submit />} />
          <Route path="/profile-user" element={<UserProfile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<CommunityNotFound />} />
        </Route>
        <Route path='/admin' element={<AdminDashboard/>} ></Route>
          <Route path='/admin/users' element={<UserList></UserList>}/>
          <Route path='/admin/posts' element={<PostsList></PostsList>}/>
          <Route path='/admin/groups' element={<GroupList></GroupList>}/>
      </Routes>
    </div>
  );
}

