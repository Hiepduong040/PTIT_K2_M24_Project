import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import AdminPostHeader from './AdminPostHeader';
import SideBarAdmin from '../../../components/SideBar/SideBarAdmin';
import "../admin.css";

type Post = {
  id: number;
  user_id: number;
  group_id: number;
  content: string;
  image: string[];
  created_at: string;
  type: 'public' | 'private';
  status: boolean;
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleToggleStatus = async (post: Post) => {
    try {
      await axios.patch(`http://localhost:8080/posts/${post.id}`, {
        status: !post.status
      });
      setPosts(posts.map(p => p.id === post.id ? { ...p, status: !p.status } : p));
    } catch (error) {
      console.error('Error toggling post status:', error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="flex-grow p-4">
        <AdminPostHeader onSearch={handleSearch} />
        <h2 className="text-2xl mb-4">Posts Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{post.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.image.map((img, idx) => (
                      <img key={idx} src={img} alt="Post" className="w-20 h-20 object-cover" />
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {post.status ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="link" className="text-blue-500 hover:text-blue-700" onClick={() => handleToggleStatus(post)}>
                      {post.status ? 'Hide' : 'Show'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
