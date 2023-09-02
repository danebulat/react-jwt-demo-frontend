import {Dispatch, SetStateAction} from "react";

export type User = {
  username: string;
  isAdmin: boolean;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
};

export type ListUser = {
  username: string;
  createdAt: string;
};

export type DecodedToken = {
  id: number;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export type SetUsersType = Dispatch<SetStateAction<ListUser[]>>;

export type AuthState = {
  currentUser:    User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;

  login:      (username: string, password: string) => Promise<void>;
  logout:     () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  register:   (username: string, password: string, setUsers: SetUsersType) => Promise<void>;
  
  loginError: boolean;
  loginErrorMsg: string;
  registerError: boolean;
  registerErrorMsg: string;
};
