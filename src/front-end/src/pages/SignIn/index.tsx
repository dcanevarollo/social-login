import React from 'react';

import SocialButton from '../../components/SocialButton';

import './styles.css';

const SignIn: React.FC = () => (
  <div className="container">
    <h1>SignIn</h1>

    <SocialButton type="google" />
  </div>
)

export default SignIn;
