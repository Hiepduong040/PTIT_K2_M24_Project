import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho Post
interface Post {
  id: string;
  communityId: string;
  communityImageURL?: string;
  creatorId: string;
  userDisplayText: string;
  title: string;
  body: string;
  createdAt: string;
}

// Định nghĩa kiểu dữ liệu cho state
interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void>('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:8080/posts');
  return response.data;
});

export const createPost = createAsyncThunk<Post, Post>('posts/createPost', async (post) => {
  const response = await axios.post('http://localhost:8080/posts', post);
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      });
  },
});

export const { selectPost } = postSlice.actions;

export default postSlice.reducer;
