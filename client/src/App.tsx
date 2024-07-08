import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
// import CreateCommmunityPostPage from './components/CreateCommunityPostPage/CreateCommunityPostPage';

const App: React.FC = () => {
  return (
    <div>
{/*       
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes> */}
          <Layout></Layout>
          {/* <Route path="/create-post" element={<CreateCommmunityPostPage />} /> */}
          {/* Các route khác */}
    </div>
  );
};

export default App;
