import React, { useState, useEffect } from 'react';
import '../context/UserSwitcher.css';
import { useUser } from './UserContext';

const UserSwitcher: React.FC = () => {
  const { user, setUser } = useUser();
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://localhost:7164/api/controller/Participants')
      .then(response => response.json())
      .then(data => {
        setUsers(data.map((user: any) => user.name));
      })
      .catch(err => console.error(err));
  }, []);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  return (
    <div className="user-switcher">
      <label htmlFor="user-select">User:</label>
      <select id="user-select" value={user} onChange={handleUserChange}>
        {users.map((userName) => (
          <option key={userName} value={userName}>
            {userName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSwitcher;
