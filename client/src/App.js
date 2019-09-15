import React, { Component } from 'react';
import './App.css'; //change it to the styles you want

import UserSignUp from './components/users/UserSignUp'
import UserSignIn from './components/users/UserSignIn'
import withContext from './components/Context'

const UserSignUpWithContext = withContext(UserSignUp);

function App() {
  return (
    <div>

    </div>
  );
}

export default App;
