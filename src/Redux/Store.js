import { combineReducers, createStore } from "redux";
import UserDetailsReducer from "./Reducers/SelectedUserReducer";
import PostsReducer from "./Reducers/PostsReducer";

const rootReducer = combineReducers({
  data: UserDetailsReducer,
  posts: PostsReducer,
});

const store = createStore(rootReducer);

export default store;
