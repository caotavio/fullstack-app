import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {

    state = {
        details: [],
        user: {},
        name: '',
        authenticated: false
    };

    async componentDidMount(){
        const {context} = this.props;
        const {match} = this.props;
        await context.data.getCourseDetail(this.props.history, match.params.id)
            .then(response => {
                if (response.error) {
                    if (response.errors.length > 0) { 
                        this.setState({
                            errors: response.errors
                        });
                    }
                } else {
                    const name = `${response.data.user.firstName} ${response.data.user.lastName}`;
                    if(context.authenticatedUser != null){
                        if(response.data.user.id === context.authenticatedUser.id){
                            this.setState({
                                authenticated: true
                            });
                        } else {
                            this.setState({
                                authenticated: false
                            });
                        }
                    }

                    if(response.data.estimatedTime === null || response.data.estimatedTime === undefined || response.data.estimatedTime === ''){
                        this.setState(
                            response.data.estimatedTime = null
                        );
                    }

                    this.setState({
                        details: response.data,
                        name
                    });
                }
            });
      }

    render(){

        const {
            details,
            name,
            authenticated
        } = this.state;

        const { context } = this.props;
        let emailAddress;
        let password;
        if(authenticated){
            emailAddress = context.authenticatedUser.emailAddress
            password = context.userPassword
        }

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                    <div className="grid-100">
                    {authenticated ?
                        <span>
                            <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                            <button className="button" onClick={()=>context.data.deleteCourse(this.props.history, details.id, emailAddress, password)
                            .then(
                                ()=> this.props.history.push('/')
                            )}>Delete Course</button>
                        </span>
                        :
                        <span></span>
                        }

                        <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{details.title}</h3>
                        <p>By {name}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={details.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{details.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={details.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;