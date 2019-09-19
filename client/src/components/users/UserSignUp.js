import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../layout/Form';

export default class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    stateChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
               [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        //new user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        };

        context.data.createUser(user)
        .then( errors => {
            if (errors.length) {
                this.setState({ errors });
            } else {
                console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
                context.actions.signIn(emailAddress, password)
                                .then(() => {
                                    this.props.history.push('/')
                });
            }
        })
        .catch( err => {
            this.setState({
                errors: [err.message]
            });
        });
    }

    cancel = () => {
       this.props.history.push('/');
    }

    render() {

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form   
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <React.Fragment>
                                    <input id="firstName"
                                            name="firstName"
                                            type="text"
                                            className=""
                                            value={firstName}
                                            onChange={this.stateChangeHandler}
                                            placeholder="First Name" />
                                    <input id="lastName"
                                            name="lastName"
                                            type="text"
                                            className=""
                                            value={lastName}
                                            onChange={this.stateChangeHandler}
                                            placeholder="Last Name" />
                                    <input id="emailAddress"
                                            name="emailAddress"
                                            type="text"
                                            className=""
                                            value={emailAddress}
                                            onChange={this.stateChangeHandler}
                                            placeholder="Email Address" />
                                    <input id="password"
                                            name="password"
                                            type="password"
                                            className=""
                                            value={password}
                                            onChange={this.stateChangeHandler}
                                            placeholder="New Password" />
                                    <input id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            className=""
                                            value={confirmPassword}
                                            onChange={this.stateChangeHandler}
                                            placeholder="Confirm Password" />
                                </React.Fragment>
                            )} />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }
}

// FIX CSS