import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js"; 

export const fetchAddPost = createAsyncThunk(
  "posts/fetchAddPost",
  async ({ title, text, tags, image }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.data?.token || localStorage.getItem("token");

      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadRes = await axios.post("/upload", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        imageUrl = uploadRes.data.url;
      }

      const postRes = await axios.post(
        "/posts",
        {
          title,
          text,
          tags,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return postRes.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Ошибка добавления поста");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAddPost.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items.push(action.payload); // добавляем созданный пост в список
      })
      .addCase(fetchAddPost.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const postsReducer = postsSlice.reducer;
