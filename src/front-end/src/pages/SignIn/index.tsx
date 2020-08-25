import React from 'react';

import GoogleButton from '../../components/GoogleButton';
import FacebookButton from '../../components/FacebookButton';

import './styles.css';

const SignIn: React.FC = () => (
  <div className="container">
    <h1>SignIn</h1>

    <div className="buttons">
      <GoogleButton />
      <FacebookButton />
    </div>
  </div>
);

export default SignIn;
