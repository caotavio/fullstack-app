/*
Context is a HOC(higher-order component) that returns a Provider component that provides the app with state
+ any actions and event handlers passed via the 'value' prop.
*/

import React, { Component } from 'react';
import Data from '../users/Data';

const Context = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    //all of the app state should be here

    //all of the functions that handle state should be here 

    render() {
        // const authenticatedUser = this.state
        const authenticatedUser = JSON.parse(localStorage.getItem("user"))

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return (
            <Context.Provider value={value}>

              { this.props.children } 
            </Context.Provider>
        );
    }

    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            user.password = password;
            this.setState(() => {
                localStorage.setItem("user", JSON.stringify(user))
                return {authenticatedUser: user};
            });
        }
        return user;
    }

    signOut = () => {
        this.setState({ authenticatedUser: null });
        localStorage.clear();
    }
}
//{ this.props.children } is a special React prop that lets you pass components as data to other components
//it will pass and render anything that we include between the provider tags 

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