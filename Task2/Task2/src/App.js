import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setUsers([]);
    const response = await fetch('https://reqres.in/api/users?page=1');
    const jsonresponse = await response.json();
    const loadedUsers = jsonresponse.data;

    for (const user of loadedUsers) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUsers(prevUsers => [...prevUsers, user]);
    }
    setLoading(false);
  };

  return (
    <div>
      <nav>
        <a href="/" className="nav-brand">User Cards</a>
        <ul className="nav-links">
          <li><button onClick={loadUsers}>Get Users</button></li>
        </ul>
      </nav>
      {loading ? (
        <div className="loader-container">
          <div className="loader" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="card-grid">
          {users.map(({ id, first_name, last_name, avatar, email }) => (
            <div className="card" key={id}>
              <img src={avatar} alt={first_name} />
              <h3>{first_name} {last_name}</h3>
              <p>{email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
