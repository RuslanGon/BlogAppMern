import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

// Асинхронные экшены (thunks)
export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Ошибка входа");
    }
  }
);

export const fetchRegister = createAsyncThunk(
    "user/fetchRegister",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await axios.post("/auth/register", params);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        return data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Ошибка регистрации");
      }
    }
  );

export const fetchAuthMe = createAsyncThunk(
  "user/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/me");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Не авторизован");
    }
  }
);

const initialState = {
  data: null,
  status: "idle", // idle | loading | loaded | error
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Логин
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // Регистрация
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // Проверка авторизации
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectIsAuth = (state) => Boolean(state.user.data);

export const userReducer = userSlice.reducer;
