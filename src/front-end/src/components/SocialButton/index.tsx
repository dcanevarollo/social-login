import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';

import { useAuth } from '../../contexts/auth';
import User from '../../models/user';

interface Props {
  type: 'google' | 'facebook';
  goal: 'signin' | 'signup';
}

const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;

const SocialButton: React.FC<Props> = ({ type, goal }) => {
  const { signIn } = useAuth();

  async function onSuccess(response: GoogleLoginResponse) {
    if (goal === 'signin') {
      signIn(response.tokenId);
    } else {
      const { profileObj, accessToken } = response;

      const data: User = {
        name: profileObj.name,
        email: profileObj.email,
        avatar_url: profileObj.imageUrl,
        remember_me_token: accessToken,
      };

      signIn(undefined, data);
    }
  }

  if (type === 'google') {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText={goal === 'signin' ? 'Sign In' : 'Sign Up'}
        onSuccess={(res) => onSuccess(res as GoogleLoginResponse)}
        onFailure={(error) => console.error(error)}
        cookiePolicy="single_host_origin"
      />
    );
  }

  // TODO : Facebook login button
  return <span>Facebook</span>;
};

export default SocialButton;
