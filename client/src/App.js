import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './styles/global.css';

import UserSignUp from './components/users/UserSignUp'
// import UserSignIn from './components/users/UserSignIn'
import withContext from './components/Context'

const UserSignUpContext = withContext(UserSignUp);

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* Header here */}
                    <Switch>
                        <Route path="/signup" component={UserSignUpContext} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;
