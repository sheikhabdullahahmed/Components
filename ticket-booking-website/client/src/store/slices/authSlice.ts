import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token') || null,
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token?: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('auth_token', action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem('auth_token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Match sign-in mutation success
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          if (action.payload.token) {
            state.token = action.payload.token;
            localStorage.setItem('auth_token', action.payload.token);
          }
        }
        state.isLoading = false;
      }
    );
    // Match sign-up mutation success
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          if (action.payload.token) {
            state.token = action.payload.token;
            localStorage.setItem('auth_token', action.payload.token);
          }
        }
        state.isLoading = false;
      }
    );
    // Match get-session query success
    builder.addMatcher(
      authApi.endpoints.getSession.matchFulfilled,
      (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getSession.matchRejected,
      (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    );
    // Match sign-out mutation success
    builder.addMatcher(
      authApi.endpoints.signOut.matchFulfilled,
      (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        localStorage.removeItem('auth_token');
      }
    );
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
