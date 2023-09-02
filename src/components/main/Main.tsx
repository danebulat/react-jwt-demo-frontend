import './main.css';
import { Routes, Route } from 'react-router-dom';
import { Profile }       from '../profile/Profile';
import { Login }         from '../login/Login';
import {SetUsersType} from '../../types/types';

type MainProps = {
  setUsers: SetUsersType;
}

export default function Main({ setUsers }: MainProps) {
  return (
    <div className="main">
      <div className="mainWrapper">
        <Routes>
          <Route path="/" element={<Login setUsers={setUsers} />} />
          <Route path="/profile" element={<Profile setUsers={setUsers} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function NotFound() {
  return <h1>404: Page Not Found</h1>;
}

