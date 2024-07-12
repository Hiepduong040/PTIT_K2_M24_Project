import React from 'react';
import moment from 'moment';

type Post = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
};

type SearchPostsProps = {
  searchTerm: string;
  posts: Post[];
  users: { [key: number]: string };
};

export default function SearchPosts({ searchTerm, posts, users }: SearchPostsProps) {
  const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2 className="text-2xl mb-4">Posts matching "{searchTerm}"</h2>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <div key={post.id} className="px-10 py-10 rounded-xl mb-3 shadow-sm bg-orange-400">
            <div className="card-body d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">{users[post.user_id]}</h5>
                <p>{post.content}</p>
                <p className="text-gray-500 text-sm">{moment(post.created_at).fromNow()}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found matching "{searchTerm}".</p>
      )}
    </div>
  );
}
