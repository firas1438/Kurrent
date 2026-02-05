import api from "@/lib/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// register a new user
export const register = (data: RegisterPayload) => {
  return api.post("/auth/register", data);
};

// login user
export const login = (data: LoginPayload) => {
  return api.post("/auth/login", data);
};

// refresh access token (uses refresh token cookie)
export const refreshToken = () => {
  return api.post("/auth/refresh");
};

// logout user (clears cookies)
export const logout = () => {
  return api.post("/auth/logout");
};

// get current authenticated user
export const getMe = () => {
  return api.get("/auth/me");
};
