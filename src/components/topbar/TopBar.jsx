import './topBar.css';
import { useAuth } from '../../contexts/AuthContext';

export default function TopBar() {
  const { currentUser } = useAuth();

  return (
    <header className="topBar">
      <h1 className="topBarHeader">JWT Authentication Demo</h1>
      <div className="topBarButtonsContainer">
      </div>
    </header>
  );
}

