import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }     from "../contexts/AuthContext";

export function Authenticate({ setUsers }) {

  const [username, setUsername] = useState("dane");
  const [password, setPassword] = useState("pass123");
  const { login, register, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  // navigate to profile if user saved in local storage
  useEffect(() => {
    const lsCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (lsCurrentUser) {
      setCurrentUser(lsCurrentUser);
      navigate('/profile');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);

    setUsername("");
    setPassword("");

    if (success) {
      navigate('/profile');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = await register(username, password); 
    // TODO: Add user to users list
  };

  return (
    <div className="inner-grid">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <span className="formTitle">Login</span>
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
          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleRegister}>
          <span className="formTitle">Register</span>
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
          <button type="submit" className="submitButton">
            Register 
          </button>
        </form>
      </div>
    </div>
  );
}
