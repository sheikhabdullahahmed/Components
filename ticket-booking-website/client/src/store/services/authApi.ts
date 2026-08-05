import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthResponse } from "../../types";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Session"],
  endpoints: (builder) => ({
    signUp: builder.mutation<
      AuthResponse,
      { email: string; password: string; name: string }
    >({
      query: (credentials) => ({
        url: "/sign-up/email",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Session"],
    }),
    signIn: builder.mutation<AuthResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/sign-in/email",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["User", "Session"],
      },
    ),
    signInSocial: builder.mutation<
      { url: string },
      { provider: string; callbackURL: string }
    >({
      query: (credentials) => ({
        url: "/sign-in/social",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Session"],
    }),
    signOut: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["User", "Session"],
    }),
    getSession: builder.query<AuthResponse | null, void>({
      query: () => "/get-session",
      providesTags: ["User", "Session"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignInSocialMutation,
  useSignOutMutation,
  useGetSessionQuery,
  useLazyGetSessionQuery,
} = authApi;
