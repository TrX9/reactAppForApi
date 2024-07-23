document.getElementById('login-btn').addEventListener('click', function() {
  const clientId = '75f7540f-a3da-475c-a7a8-d164ad8275bd';
  const redirectUri = encodeURIComponent('http://localhost:8000/redirect');
  const responseType = 'code';
  const scope = 'User.Read';
  const state = 'random-state-value';

  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  window.location.href = authUrl;
});

function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    fetch('http://localhost:7000/api/Auth/exchange-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.AccessToken) {
        localStorage.setItem('access_token', data.AccessToken);
        document.getElementById('message').innerText = 'Login successful!';
      } else {
        document.getElementById('message').innerText = 'Error retrieving token.';
      }
    })
    .catch(error => {
      console.error('Error exchanging token:', error);
    });
  } else {
    document.getElementById('message').innerText = 'No authorization code found.';
  }
}

// Handle redirect when the script is loaded from the redirect URL
if (window.location.pathname.includes('/redirect')) {
  handleRedirect();
}
