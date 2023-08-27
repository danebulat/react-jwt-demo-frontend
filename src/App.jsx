import './App.css';
import { useState } from 'react';
import TopBar from './components/topbar/TopBar';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Leftbar from './components/leftbar/Leftbar';

export default function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <TopBar />
      
      <div className="jwtDemo">
        <Leftbar />
        <Main setUsers={setUsers} />
        <Sidebar setUsers={setUsers} users={users} />
      </div>
    </>
  )
}

