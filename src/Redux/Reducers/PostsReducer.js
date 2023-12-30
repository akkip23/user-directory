const initialState = {
  posts: [],
  error: null,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POSTS_DATA_SUCCESS":
      return { ...state, posts: action.payload, error: null };

    case "POSTS_DATA_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default PostsReducer;
