export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.hasError;

export const selectPosts = (state) => state.posts.posts;

export const selectSpecificPost = (state) => {
  const { posts } = state;
  const foundPost = state.posts.posts.find(
    (post) => post.id === posts.selectedPostId
  );
  return foundPost;
};
