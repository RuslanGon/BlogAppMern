import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slice/posts.js";
import { userReducer } from "./slice/user.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer
  },
});

