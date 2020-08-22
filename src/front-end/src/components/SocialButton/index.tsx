import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';

interface Props {
  type: 'google' | 'facebook';
};

const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;

const SocialButton: React.FC<Props> = ({ type }) => {
  function onSuccess(response: GoogleLoginResponse | any) {
    console.log(`Success: ${response.profileObj}`);
  }

  function onFailure(response: GoogleLoginResponse): void {
    console.log(`Failed: ${response}`);
  }

  if (type === 'google')
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    );
  
  return <span>Facebook</span>
};

export default SocialButton;
