import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate }    from 'react-router-dom';
import { useAuth }        from "../contexts/AuthContext";
import { ListUser, User } from "../types/types";

type LoginProps = {
  setUsers: Dispatch<SetStateAction<ListUser[]>>
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
      const lsCurrentUser: User = JSON.parse(getUser);
      setCurrentUser(lsCurrentUser);
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
    <div className="inner-grid">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <span className="formTitle">Login</span>
          {loginError && <span className="error">{loginErrorMsg}</span>}
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading
            ? <button disabled type="submit" className="submitButton">Login</button>
            : <button type="submit" className="submitButton">Login</button>}
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleRegister}>
          <span className="formTitle">Register</span>
          {registerError && <span className="error">{registerErrorMsg}</span>}
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading 
            ? <button disabled type="submit" className="submitButton">Register</button>
            : <button type="submit" className="submitButton">Register</button>}
        </form>
      </div>
    </div>
  );
}
