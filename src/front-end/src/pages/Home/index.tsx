import React from 'react';
import { useAuth } from '../../contexts/auth';

import './styles.css';

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="container">
      <h1>Home</h1>

      <img src={user?.avatar_url} alt={user?.name} className="avatar" />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>

      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Home;
