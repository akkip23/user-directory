const initialState = {
  userDetails: [],
  error: null,
};

const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return { ...state, userDetails: action.payload, error: null };

    case "FETCH_DATA_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default UserDetailsReducer;
