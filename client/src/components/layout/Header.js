import React from 'react';
import { Link } from 'react-router-dom';


export default class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authenticatedUser = context.authenticatedUser;

        return (
            <div className="header">
                <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                    <nav>
                        {authenticatedUser ?
                            <React.Fragment>
                                <span>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!</span>
                                <Link to="/signout">
                                    Sign Out
                                </Link>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Link className="signup" to="/signup">
                                    Sign Up
                                </Link>
                                <Link className="signin" to="/signin">
                                    Sign In
                                </Link>
                            </React.Fragment>
                        }
                    </nav>
                </div>
            </div>
        );
    }
};