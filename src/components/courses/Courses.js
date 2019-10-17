import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        };
    }

    async componentDidMount() {
        const { context } = this.props;
        await context.data.getCourses(this.props.history)
            .then(response => {
                if (response.error) {
                    if (response.errors.length > 0) {
                        this.setState({
                            errors: response.errors
                        });
                    }
                } else {
                    this.setState({ courses: response.data });
                }
            });
    }

    render(){

        const {courses} = this.state;
        return(
            <div className="bounds">
            {courses.map((course, index)=>
                <div key={ `a + ${index}`} className="grid-33">
                    <Link key={ `b + ${index}`} className="course--module course--link" id={course.id} to={`/courses/${course.id}`}>
                        <h4 key={ `c + ${index}`} className="course--label">Course</h4>
                        <h3 key={ `d + ${index}`} className="course--title">{course.title}</h3>
                    </Link>
                </div>
            )}
            <div className="grid-33">
                <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points=    "7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                </Link></div>
            </div>
        );
    };    
}

export default Courses;