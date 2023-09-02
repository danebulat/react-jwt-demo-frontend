import './profile.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import jwt_decode from 'jwt-decode';
import {DecodedToken, SetUsersType} from '../../types/types';

type ProfileProps = {
  setUsers: SetUsersType;
}

export function Profile({ setUsers }: ProfileProps) {

  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, deleteUser, logout } = useAuth(); 

  useEffect(() => {
    const getUser = localStorage.getItem('currentUser');

    if (!getUser) navigate('/');
    if (!currentUser && getUser) 
      setCurrentUser(JSON.parse(getUser));

    setIsLoading(false);
  }, []);

  const handleDelete = async () => {
    const conf = confirm('Are you sure?');
    if (!conf) return;
    if (!currentUser) return;

    const usernameToRemove = currentUser.username;
    const { id } = jwt_decode<DecodedToken>(currentUser.accessToken);
    await deleteUser(id);

    setUsers(prev => prev.filter(u => u.username !== usernameToRemove));
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="profile">
        <div className="profileWrapper">

          <span>
            Welcome to the <b>{currentUser?.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{currentUser?.username}</b>.
          </span>
          <button className="deleteButton" onClick={() => handleDelete()}>
            Delete Account 
          </button>
          <button className="logoutButton" onClick={() => handleLogout()}>
            Logout
          </button>

        </div>
      </div>
    );
  }
}

