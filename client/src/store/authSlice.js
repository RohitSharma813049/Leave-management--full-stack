import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch current user using token
export const fetchMe = createAsyncThunk("https://leave-management-full-stack-backend.onrender.com/auth/fetchMe", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    const res = await axios.get("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // expected { name, email, role }
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Unauthorized access"
    );
  }
});

// Login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("https://leave-management-full-stack-backend.onrender.com/api/login", { email, password });
      // Ensure backend returns { token, user }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        localStorage.setItem("token", action.payload.token);
        console.log("Login fulfilled - token:", action.payload.token);
        console.log("Login fulfilled - user:", action.payload.user);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FetchMe
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log("FetchMe fulfilled - user:", action.payload);
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't clear token immediately — check if token expired first
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
