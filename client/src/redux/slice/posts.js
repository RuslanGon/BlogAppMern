import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
    //   .addCase(apiGetContacts.pending, (state) => {
    //     state.isLoading = true;
    //     state.isError = false;
    //   })
    //   .addCase(apiGetContacts.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.contacts = action.payload;
    //   })
    //   .addCase(apiGetContacts.rejected, (state) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //   });
  },
});

export const postsReducer = postsSlice.reducer;
