import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';

import { useAuth } from '../../contexts/auth';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const GoogleButton: React.FC = () => {
  const { signIn } = useAuth();

  function onSuccess(response: GoogleLoginResponse) {
    signIn(response.tokenId, 'google');
  }

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="with Google"
      onSuccess={(response) => onSuccess(response as GoogleLoginResponse)}
      onFailure={(error) => console.error(error)}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleButton;
