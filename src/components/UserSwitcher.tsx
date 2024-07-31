import React from 'react';
import { useUser } from './context/UserContext';
import '../styles/UserSwitcher.css';

const UserSwitcher: React.FC = () => {
  const { user, setUser } = useUser();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  return (
    <div className="user-switcher">
      <label htmlFor="user-select">User:</label>
      <select id="user-select" value={user} onChange={handleUserChange}>
        <option value="David">David</option>
        <option value="Haris">Haris</option>
        <option value="Simon">Simon</option>
        <option value="Scofield">Scofield</option>
      </select>
    </div>
  );
};

export default UserSwitcher;
