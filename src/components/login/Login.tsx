import './login.css';
import { useState, useEffect } from "react";
import { useNavigate }         from 'react-router-dom';
import { useAuth }             from '../../contexts/AuthContext';
import {SetUsersType} from '../../types/types';

type LoginProps = {
  setUsers: SetUsersType;
};

export function Login({ setUsers }: LoginProps) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const navigate = useNavigate();
  const { 
    setCurrentUser, 
    login, 
    register, 
    loginError,
    loginErrorMsg, 
    registerError, 
    registerErrorMsg } = useAuth();

  // navigate to profile if user saved in local storage
  useEffect(() => {
    const getUser = localStorage.getItem('currentUser');

    if (getUser) {
      setCurrentUser(JSON.parse(getUser));
      navigate('/profile');
    }
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login(username.trim(), password.trim());
    setLoading(false);
  };

  const handleRegister = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await register(username.trim(), password.trim(), setUsers); 
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <span className="formTitle">Login</span>
          {loginError && <span className="error">{loginErrorMsg}</span>}
          <input
            className="formInput"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="formInput"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading
            ? <button disabled type="submit" className="loginSubmitButton">Login</button>
            : <button type="submit" className="loginSubmitButton">Login</button>}
        </form>
      </div>

      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleRegister}>
          <span className="formTitle">Register</span>
          {registerError && <span className="error">{registerErrorMsg}</span>}
          <input
            className="formInput"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="formInput"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading 
            ? <button disabled type="submit" className="registerSubmitButton">Register</button>
            : <button type="submit" className="registerSubmitButton">Register</button>}
        </form>
      </div>
    </div>
  );
}
