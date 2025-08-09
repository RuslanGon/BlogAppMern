import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slice/posts.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
});

