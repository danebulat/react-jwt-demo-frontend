import React, { useContext, useState } from "react";
import axios, {AxiosResponse, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import jwt_decode             from 'jwt-decode';
import { useNavigate }        from "react-router-dom";
import { serverUri}           from '../config/server.js';
import { AuthState, DecodedToken, SetUsersType, User } from "../types/types.js";

// The context object
const AuthContext = React.createContext<AuthState | null>(null);

// The '| null' will be removed via the check in the hook
export function useAuth() {
  const object = useContext(AuthContext);
  if (!object) {
    throw new Error("AuthState must be used within a Provider");
  }
  return object;
}

// Application top-level component
export function AuthProvider({ children }: {children: React.ReactNode}) {

  const [currentUser,      setCurrentUser]      = useState<User | null>(null);
  const [loginError,       setLoginError]       = useState<boolean>(false);
  const [loginErrorMsg,    setLoginErrorMsg]    = useState<string>('');
  const [registerError,    setRegisterError]    = useState<boolean>(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  // Axios instance that requires the interceptor 
  // before every request
  const axiosJWT: AxiosInstance = axios.create();

  /* -------------------------------------------------- */
  /* Refresh token                                      */
  /* -------------------------------------------------- */

  async function refreshToken() {
    try {
      const res = await axios.post(`${serverUri}/api/refresh`,
        { token: currentUser?.refreshToken });

      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
      }
    }
    catch (err) {
      console.log(err);

      // No longer authenticated
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      navigate('/');
    }
  }

  // check refresh token before every request
  axiosJWT.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      let currentDate = new Date();

      if (currentUser === null)
        return config;

      const decodedToken = jwt_decode<DecodedToken>(currentUser.accessToken);
  
      // generate new tokens if access token expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await refreshToken();
        config.headers["authorization"] = "Bearer " + currentUser.accessToken;
      }
  
      // return updated config for the request
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /* -------------------------------------------------- */
  /* Handlers                                           */
  /* -------------------------------------------------- */

  async function register(username: string, password: string, 
                          setUsers: SetUsersType) {
    if (!username || !password) {
      setRegisterError(true);
      setRegisterErrorMsg('Provide a username and password');
      return;
    }

    try {
      const res: AxiosResponse = await axios.post(`${serverUri}/api/register`, {
        username, password
      });

      setCurrentUser({ ...res.data });
      setRegisterError(false);

      localStorage.setItem('currentUser', JSON.stringify({ ...res.data }));
      setUsers(prev => [...prev, { ...res.data }]);
      navigate('/profile');
    }
    catch (err: any) {
      console.log(err);
      setRegisterError(true);
      setRegisterErrorMsg(err.response.data.error);
    }
  }

  async function login(username: string, password: string) {
    if (!username.trim() || !password.trim()) {
      setLoginError(true);
      setLoginErrorMsg('Provide a username and password');
      return;
    }

    try {
      const res = await axios.post(`${serverUri}/api/login`, { 
        username, password 
      });

      setCurrentUser({ ...res.data });
      setLoginError(false);

      localStorage.setItem('currentUser', JSON.stringify({ ...res.data }));
      navigate('/profile');
    }
    catch (err: any) {
      console.log(err);
      setLoginError(true);
      setLoginErrorMsg(err.response.data.error);
    }
  }

  async function logout() {
    const accessToken = currentUser?.accessToken;

    await axiosJWT.post(
      `${serverUri}/api/logout`,
      { token: currentUser?.refreshToken },
      { headers: { authorization: "Bearer " + accessToken }},
    );

    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  async function deleteUser(id: number) {
    try {
      await axiosJWT.delete(`${serverUri}/api/users/${id}`, {
        headers: { authorization: "Bearer " + currentUser?.accessToken }
      });
      
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
    catch (err) {
      console.log(err);
    }
  }

  const value: AuthState = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    deleteUser,
    register,

    loginError,
    loginErrorMsg,
    registerError,
    registerErrorMsg,
  };

  // Provide context value
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};
