import { useEffect } from 'react';
import axios         from 'axios';
import { serverUri } from '../../config/server';
import { format }    from 'timeago.js';
import { SetUsersType, ListUser } from '../../types/types';
import './sidebar.css';

type SidebarProps = {
  setUsers: SetUsersType;
  users: ListUser[];
}

export default function Sidebar({ setUsers, users }: SidebarProps) {

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await axios.get(`${serverUri}/api/users`);
        setUsers(result.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      
        <h1 className="sidebarTitle">Registered Users</h1>
        <div className="sidebarSubtitle">
          <span className="sidebarSubtitleLeft">{users.length} total</span>
          &#183;
          <span className="sidebarSubtitleRight">100 max</span>
        </div>
        
        <ul className="sidebarUserList">
          {users.map(u => (
            <li className="sidebarUserListItem" key={u.username}>
              <span className="sidebarUsername">{u.username}</span>
              <span className="sidebarCreatedAt">joined {format(u.createdAt)}</span>
            </li>
          ))}
        </ul>
    
      </div>
    </div>
  );
}
