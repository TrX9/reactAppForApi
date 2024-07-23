// LoginPage.js
import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    const clientId = '75f7540f-a3da-475c-a7a8-d164ad8275bd';
    const redirectUri = encodeURIComponent('http://localhost:3000/redirect'); // This should match your registered redirect URI
    const responseType = 'code';
    const scope = 'User.Read';
    const state = 'random-state-value';

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with Azure</button>
    </div>
  );
}

export default LoginPage;
