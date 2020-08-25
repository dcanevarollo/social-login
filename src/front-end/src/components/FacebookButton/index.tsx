import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useAuth } from '../../contexts/auth';

const appId = process.env.REACT_APP_FACEBOOK_APP_ID as string;

const FacebookButton: React.FC = () => {
  const { signIn } = useAuth();

  function onSuccess(response: ReactFacebookLoginInfo) {
    signIn(response.accessToken, 'facebook');
  }

  return (
    <FacebookLogin
      appId={appId}
      textButton="with Facebook"
      callback={(response) => onSuccess(response as ReactFacebookLoginInfo)}
    />
  );
};

export default FacebookButton;
