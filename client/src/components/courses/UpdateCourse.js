import React, { Component } from 'react';
import Form from '../layout/Form';

class UpdateCourse extends Component {

    state = {
        name: '',
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    };

    async componentDidMount(){
        const { context } = this.props;
        const { match } = this.props;
        await context.data.getCourseDetail(this.props.history, match.params.id)
            .then(response=>{
                const name = `${response.data.user.firstName} ${response.data.user.lastName}`;
        
                const {
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    id
                } = response.data;
        
                this.setState({
                    name,
                    id,
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                });
            });
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
        const { emailAddress } = context.authenticatedUser;
        const password = context.userPassword;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id
        } = this.state;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        };

        context.data.updateCourse(this.props.history, course, id, emailAddress, password)
                    .then(response => {
                        if (response.error) {
                            if (response.errors.length > 0) {
                                this.setState({
                                    errors: response.errors
                                });
                            }
                        } else {
                            if (response.data !== null) {
                                this.props.history.push(`/courses/${id}`);
                            } else {    
                                this.setState(() => {
                                    return { errors: ["Failed to update course"] };
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
        const { id } = this.state;
        const { from } = this.props.location.state || { from: { pathname: `/courses/${id}` } };
        this.props.history.push(from);
    }

    render(){

        const {
            name,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
            } = this.state;
       
        return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                    <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
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
                                <p>by{` ${name}`}</p>
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

export default UpdateCourse;