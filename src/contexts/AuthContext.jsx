import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// The context object
const AuthContext = React.createContext();

// Return context value
export function useAuth() {
  return useContext(AuthContext);
}

// Application top-level component
export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Axios instance that requires the interceptor 
  // before every request
  const axiosJWT = axios.create();

  /* -------------------------------------------------- */
  /* Refresh token                                      */
  /* -------------------------------------------------- */

  async function refreshToken() {
    try {
      const res = await axios.post('http://localhost:5000/api/refresh', 
        { token: currentUser.refreshToken });

      setCurrentUser({
        ...currentUser,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
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
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(currentUser.accessToken);
  
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

  async function register(username, password) {
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        username, password
      });

      setCurrentUser({ ...res.data });
      localStorage.setItem('currentUser', JSON.stringify({ ...res.data }));
      return { ...res.data };
    }
    catch (err) {
      console.log(err);
    }
  }

  async function login(username, password) {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { 
        username, password 
      });

      setCurrentUser({ ...res.data });

      if (res.data.username === username) {
        localStorage.setItem('currentUser', JSON.stringify({ ...res.data }));
        return true;
      }
      else return false;
    }
    catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    const accessToken = currentUser.accessToken;

    await axiosJWT.post(
      'http://localhost:5000/api/logout',
      { token: currentUser.refreshToken },
      { headers: { authorization: "Bearer " + accessToken }},
    );

    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  async function deleteUser(id) {
    setSuccess(false);
    setError(false);

    try {
      await axiosJWT.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { authorization: "Bearer " + currentUser.accessToken }
      });
      
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      navigate('/');
    }
    catch (err) {
      setError(true);
    }
  }

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    deleteUser,
    refreshToken,
    error,
    success,
    register,
  };

  // Provide context value
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};
