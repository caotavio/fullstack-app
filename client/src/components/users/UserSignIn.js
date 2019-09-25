import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../layout/Form';

export default class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
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
            emailAddress,
            password
        } = this.state;

        context.actions.signIn(emailAddress, password)
        .then(response => {
            if (response.error) {
                if (response.errors.length > 0) {
                    this.setState({
                        errors: response.errors
                    });
                }
            } else {
                if (response.data !== null) {
                    this.props.history.goBack();
                } else {
                    this.setState(() => {
                        return { errors: ["Login failed"] };
                    });
                }
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

    componentDidMount() {
        if (this.props.context.authenticatedUser) {
            this.props.history.push('/')
        }
    }

    render() {

        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <Form   
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <React.Fragment>
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
                                </React.Fragment>
                            )} />
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}