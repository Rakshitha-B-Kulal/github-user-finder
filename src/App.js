import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepositoryList from './components/RepositoryList';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setUserData(null);
    setRepos([]);
    setLoading(true);
    setError(null);
    try {
      const userDetails = await fetchUserDetails(username);
      const userRepos = await fetchUserRepos(username);
      setUserData(userDetails);
      setRepos(userRepos);
    } catch (err) {
      setError(err.message);
    } 
      setLoading(false);
    
  };

  const fetchUserDetails = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "User not found");
    }
    return response.json();
  };

  const fetchUserRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
    if (!response.ok) {
      throw new Error('Repositories not found');
    }
    return response.json();
  };

  return (
    <div className="app">
      <h1>GitHub User Finder</h1>
      <SearchBar username={username} setUsername={setUsername} handleSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {userData && <UserProfile userData={userData} />}
      {repos.length > 0 && <RepositoryList repos={repos} />}
    </div>
  );
};

export default App;