import React from 'react';

import SocialButton from '../../components/SocialButton';

import './styles.css';

const SignIn: React.FC = () => (
  <div className="container">
    <h1>SignIn</h1>

    <div className="buttons">
      <SocialButton type="google" goal="signin" />
      <SocialButton type="google" goal="signup" />
    </div>
  </div>
);

export default SignIn;
