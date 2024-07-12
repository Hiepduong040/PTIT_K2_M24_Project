import { useEffect, useState } from "react";
// import { Post, User } from "../../interfaces/interfaces";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import {
  CiChat1,
  CiHeart,
  CiSaveDown1,
  CiShare1,
  CiTrash,
} from "react-icons/ci";
import moment from "moment";
import { Spinner, Stack } from "react-bootstrap";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

type PostsProps = {
  communityId: number;
};

type Post = {
  id: number;
  user_id: number;
  group_id: number;
  content: string;
  image: string[];
  created_at: string;
  reactions: any[];
  type: "public" | "private";
};

type User = {
  id: number;
  userName: string;
};

type CreateUserPostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  userId: number;
  onPostCreated: () => void;
};

type EditPostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  post: Post;
  onPostUpdated: () => void;
};

type DeletePostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

const Posts: React.FC<PostsProps> = ({ communityId }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostEditClick = (post: Post) => {
    console.log("111111111111111111", post);
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handlePostDeleteClick = (post: Post) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const handlePostUpdated = async () => {
    await fetchPosts();
  };

  const handlePostDeleted = async () => {
    if (selectedPost) {
      try {
        await axios.delete(`http://localhost:8080/posts/${selectedPost.id}`);
        setPosts(posts.filter((post) => post.id !== selectedPost.id));
        setDeleteModalOpen(false);
        setSelectedPost(null);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const fetchPosts = async () => {
    try {
      const postsResponse = await axios.get("http://localhost:8080/posts");
      setPosts(postsResponse.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get("http://localhost:8080/posts");
        const usersResponse = await axios.get("http://localhost:8080/users");
        setPosts(postsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserNameById = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.userName : "Unknown";
  };

  const filteredPosts = posts.filter((post) => post.group_id === communityId);
  console.log(posts);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Stack>
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-item bg-white border p-3 rounded mb-3"
            >
              <div className="post-header flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="author font-bold">
                    {getUserNameById(post.user_id)}
                  </span>
                  <span className="post-type text-sm text-gray-500">
                    {post.type}
                  </span>
                </div>
                <span className="created-at text-gray-500 text-sm">
                  {moment(post.created_at).fromNow()}
                </span>
                <FaEllipsisH
                  className="cursor-pointer"
                  onClick={() => handlePostEditClick(post)}
                />
              </div>
              <div className="post-content mb-2">{post.content}</div>
              {post.image && post.image.length > 0 && (
                <div className="post-image mb-2">
                  <img
                    src={post.image[0]}
                    alt="Post Image"
                    className="w-full rounded"
                  />
                </div>
              )}
              <div className="pl-1 post-reactions text-gray-500 text-sm flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <CiHeart className="text-lg" />
                  <span>{post.reactions.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CiChat1 className="text-lg cursor-pointer" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CiShare1 className="text-lg cursor-pointer" />
                  <span>Share</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CiSaveDown1 className="text-lg cursor-pointer" />
                  <span>Save</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CiTrash
                    className="text-lg cursor-pointer"
                    onClick={() => handlePostDeleteClick(post)}
                  />
                  <span>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </Stack>
      )}
      {selectedPost && (
        <>
          <EditPostModal
            isOpen={editModalOpen}
            handleClose={() => setEditModalOpen(false)}
            post={selectedPost}
            onPostUpdated={handlePostUpdated}
          />
          <DeletePostModal
            isOpen={deleteModalOpen}
            handleClose={() => setDeleteModalOpen(false)}
            handleDelete={handlePostDeleted}
          />
        </>
      )}
    </div>
  );
};

export default Posts;
