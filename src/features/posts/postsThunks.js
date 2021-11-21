import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/?_page=1'
  ).then((response) => response.json());
  return response;
});
