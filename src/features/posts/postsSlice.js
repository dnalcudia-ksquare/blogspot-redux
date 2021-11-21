import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './postsThunks';

const initialState = {
  posts: [],
  selectedPostId: '',
  isLoading: false,
  hasError: false,
};

export const counterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPostId = action.payload;
    },
    addPost: (state, payload) => {
      const { userId, title, body } = payload.payload;
      const maxIndex = Math.max.apply(
        Math,
        state.posts.map(function (post) {
          return post.id;
        })
      );
      const newPost = {
        userId: userId,
        id: maxIndex + 1,
        title: title,
        body: body,
      };
      state.posts = [...state.posts, newPost];
    },
    removePost: (state, payload) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === payload.payload
      );
      state.posts.splice(postIndex, 1);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        if (state.posts.length === 0) {
          state.posts = [...state.posts, ...action.payload];
        }
        state.isLoading = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      }),
});

export const { setSelectedPost, addPost, removePost } = counterSlice.actions;

export default counterSlice.reducer;
