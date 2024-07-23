import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        console.log(code);
        try {
          const response = await axios.post('https://localhost:7000/api/TokenExchange/exchange-token', { code });
          const data = response.data;
          console.log(data);
          if (data.accessToken) {
            localStorage.setItem('access_token', data.accessToken);
            navigate('/');
          } else {
            console.error('Token not found in response', data);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error exchanging token', error);
          navigate('/login');
        }
      } else {
        console.error('Authorization code not found');
        navigate('/login');
      }
    };

    exchangeToken();
  }, [navigate]);

  return (
    <div>
      <h1>Redirect Page</h1>
      <p>Processing authentication...</p>
    </div>
  );
}

export default RedirectPage;
