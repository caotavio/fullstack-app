/*
  Context is a HOC (higher-order component) that returns a Provider component that provides the app with state
  + any actions and event handlers passed via the 'value' prop.
*/

import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    //keeps the authenticated user in local storage (keeps user logged in until he logs out even if new tabs are opened)
    state = {
        authenticatedUser: JSON.parse(localStorage.getItem("user")) || null,
        userPassword: localStorage.getItem("userPassword") || null,
        history: null
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
        const userPassword = localStorage.getItem("userPassword"); 

        const value = {
            authenticatedUser,
            userPassword,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                updateCourse: this.updateCourse,
                createCourse: this.createCourse,
                deleteCourse: this.deleteCourse,
                getCourses: this.getCourses
            }
        };

        //{ this.props.children } is a special React prop that lets you pass components as data to other components
        //it will pass and render anything that we include between the provider tags 
        return (
            <Context.Provider value={value}>

              { this.props.children } 
            </Context.Provider>
        );
    }


    //signs in the user storing his data in local storage
    signIn = async (emailAddress, password) => {
        return await this.data.getUser(this.props.history, emailAddress, password)
        .then(response => {
            if (!response.error) {
                if (response.data !== null) {
                    this.setState(() => {
                        localStorage.setItem("authenticatedUser", JSON.stringify(response.data))
                        localStorage.setItem("userPassword", password)
                        return {
                            authenticatedUser: response.data,
                            userPassword: password
                        };
                    });
                }
            }

            return response;
        });
    }

    //signs out the user cleaning the local storage
    signOut = () => {
        this.setState(()=>{
            return{
                authenticatedUser: null,
                userPassword: null
            };
        });
        localStorage.clear();
    }

    setHistory = (history) => {
        this.setState({ history });
    }

}

export const Consumer = Context.Consumer;

//a higher order function that automatically subscribes the component that has it to all actions and context changes
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
  }