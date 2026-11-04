import type { User } from "@/types/user";

export type AuthUser = User;

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};
