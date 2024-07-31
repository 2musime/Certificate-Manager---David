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
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
        <option value="user3">User 3</option>
        <option value="user4">User 4</option>
      </select>
    </div>
  );
};

export default UserSwitcher;
