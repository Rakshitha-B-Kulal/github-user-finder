import React from 'react';

const RepositoryList = ({ repos }) => {
  return (
    <div className="repository-list">
      <h3>Top 5 Repositories</h3>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>Stars: {repo.stargazers_count}</p>
            <p>{repo.description || 'No description available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;