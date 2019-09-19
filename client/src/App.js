import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './styles/global.css';

import UserSignUp from './components/users/UserSignUp'
import UserSignIn from './components/users/UserSignIn'
import UserSignOut from './components/users/UserSignOut'
import Header from './components/layout/Header'
import withContext from './components/Context'

import NotFound from './components/layout/NotFound'



const UserSignUpContext = withContext(UserSignUp);
const UserSignInContext = withContext(UserSignIn);
const UserSignOutContext = withContext(UserSignOut);

const HeaderContext = withContext(Header);

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <HeaderContext />
                    <Switch>
                        <Route path="/signin" component={UserSignInContext} />
                        <Route path="/signup" component={UserSignUpContext} />
                        <Route path="/signout" component={UserSignOutContext} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;
