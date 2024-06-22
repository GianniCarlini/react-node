import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/posts');
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await axios.post('/posts', post);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
      posts: [],
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.posts.push(action.payload);
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          state.posts = state.posts.filter(post => post.id !== action.payload);
        });
    }
  });
  

export default postsSlice.reducer;
