import React, { Component } from 'react';
import Form from '../layout/Form';

class CreateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    };

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
        const {emailAddress} = context.authenticatedUser;
        const password = context.userPassword;
        const userId = context.authenticatedUser.id;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded 
        } = this.state;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        };
 
        context.data.createCourse(this.props.history, course, emailAddress, password)
            .then(response => {
                if (response.error) {
                    //if there's an error and the errors array is empty, it takes no action because it will be redirected to one of the error pages
                    if (response.errors.length > 0) {
                        this.setState({
                            errors: response.errors
                        });
                    }
                } else { 
                    this.props.history.push('/');
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

    render(){

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
            } = this.state;

        const { context } = this.props;
        const authenticatedUserFirstName = context.authenticatedUser.firstName;
        const authenticatedUserLastName = context.authenticatedUser.lastName;
       
        return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                    <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                            <h4 className="course--label">Course</h4>
                                <div>
                                    <input
                                        id="title"
                                        name="title"
                                        className="input-title course--title--input"
                                        type="text"
                                        value={title}
                                        onChange={this.stateChangeHandler}
                                        placeholder="Title" />
                                    </div>
                                <p>by{` ${authenticatedUserFirstName} ${authenticatedUserLastName}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                <textarea
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={description}
                                    onChange={this.stateChangeHandler}
                                    placeholder="Course Description"
                                />
                                </div>
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id= "estimatedTime"
                                                name = "estimatedTime"
                                                type="text"
                                                value={estimatedTime}
                                                onChange={this.stateChangeHandler}
                                                placeholder="Estimated Time"
                                            />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <textarea
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            type="text"
                                            value={materialsNeeded}
                                            onChange={this.stateChangeHandler}
                                            placeholder="Materials Needed"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            />
        </div>
        );
    }
}

export default CreateCourse;