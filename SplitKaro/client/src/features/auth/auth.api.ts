import { api, ApiError } from "@/lib/api";
import type { AuthUser, LoginInput, SignupInput } from "./auth.types";

export const authApi = {
  login: (data: LoginInput) =>
    api<AuthUser>("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  signup: (data: SignupInput) =>
    api<AuthUser>("/auth/signup", { method: "POST", body: JSON.stringify(data) }),

  logout: () => api<void>("/auth/logout", { method: "POST" }),

  // Returns null instead of throwing when there is no valid session.
  me: async () => {
    try {
      return await api<AuthUser>("/auth/me");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    }
  },
};
