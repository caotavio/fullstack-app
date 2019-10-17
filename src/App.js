import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './styles/global.css';

import PrivateRoute from './components/layout/PrivateRoute'
import Header from './components/layout/Header'
import UserSignUp from './components/users/UserSignUp'
import UserSignIn from './components/users/UserSignIn'
import UserSignOut from './components/users/UserSignOut'
import Courses from './components/courses/Courses'
import CourseDetail from './components/courses/CourseDetail'
import CreateCourse from './components/courses/CreateCourse'
import UpdateCourse from './components/courses/UpdateCourse'
import Forbidden from './components/layout/Forbidden'
import NotFound from './components/layout/NotFound'
import UnhandledError from './components/layout/UnhandledError';

import withContext from './components/Context'

//subscribes the components to Context as consumers
const HeaderContext = withContext(Header);
const UserSignUpContext = withContext(UserSignUp);
const UserSignInContext = withContext(UserSignIn);
const UserSignOutContext = withContext(UserSignOut);
const CoursesContext = withContext(Courses);
const CourseDetailContext = withContext(CourseDetail);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <HeaderContext />
                    <Switch>
                        <Route exact path="/" component={CoursesContext} />
                        <Route path="/signin" component={UserSignInContext} />
                        <Route path="/signup" component={UserSignUpContext} />
                        <Route path="/signout" component={UserSignOutContext} />
                        <PrivateRoute exact path="/courses/create" component={CreateCourseContext} />
                        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseContext} />
                        <Route exact path="/courses/:id" component={CourseDetailContext} />
                        <Route path="/forbidden" component={Forbidden} />
                        <Route path="/error" component={UnhandledError} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;
