import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';

import { useAuth } from '../../contexts/auth';

interface Props {
  type: 'google' | 'facebook';
}

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

const SocialButton: React.FC<Props> = ({ type }) => {
  const { signIn } = useAuth();

  function onSuccess(response: GoogleLoginResponse) {
    signIn(response.tokenId);
  }

  if (type === 'google') {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign In"
        onSuccess={(response) => onSuccess(response as GoogleLoginResponse)}
        onFailure={(error) => console.error(error)}
        cookiePolicy="single_host_origin"
      />
    );
  }

  // TODO : Facebook login button
  return <span>Facebook</span>;
};

export default SocialButton;
