import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div className="user-profile">
      <img src={userData.avatar_url} alt={userData.login} />
      <h2>{userData.name || userData.login}</h2>
      <p>{userData.bio || 'No bio available'}</p>
      <p>Followers: {userData.followers}</p>
    </div>
  );
};

export default UserProfile;