import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login }    from './components/Login';
import { Profile }         from './components/Profile';
import { timestampToDate } from './utils.js';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/users');
        setUsers(result.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="container">
      <div className="outer-grid">
        <div className="page-left">
          <span className="leftTitle">Registered Users</span>
          <ul className="users-ul">
            {users.map(user => (
              <li key={user.username}>
                {user.username}
                <span className="sub-txt">
                  joined {timestampToDate(user.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Login setUsers={setUsers} />} />
          <Route path="/profile" element={<Profile setUsers={setUsers} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

function NotFound() {
  return <h1>404: Page Not Found</h1>;
}

export default App
