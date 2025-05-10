import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/libs/constants/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt";

interface User {
  id: string;
  name: string;
  email: string;
  pmdcNumber: string;
  phoneNumber: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Async thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const data = response.data;

      if (data.success) {
        return data; // Contains user and potentially a token
      } else {
        return rejectWithValue(data.message || "Signup failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ pmdcNumber, password }: { pmdcNumber: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { pmdcNumber, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;

      if (data.success) {
        // Store user and token in AsyncStorage
        await AsyncStorage.multiSet([
          ["user", JSON.stringify(data.user)],
          ["token", data.token],
        ]);
        return data; // Contains user and token
      } else {
        return rejectWithValue(data.message || "Invalid credentials");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.multiRemove(["user", "token"]);
      Burnt.toast({ title: "Logged out successfully", preset: "done" });
    },
    setAuthFromStorage: (state, action: PayloadAction<{ user: User | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // Signup reducers
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      // Optionally store user info if your backend returns it after signup
      // state.user = action.payload.user;
      Burnt.toast({ title: "Signup successful", preset: "done" });
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string | null;
      if (state.error) {
        Burnt.toast({ title: state.error, preset: "error" });
      }
    });

    // Login reducers
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      Burnt.toast({ title: "Login successful", preset: "done" });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string | null;
      if (state.error) {
        Burnt.toast({ title: state.error, preset: "error" });
      }
    });
  },
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;