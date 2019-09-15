/*
Context is a HOC(higher-order component) that returns a Provider component that provides the app with state
+ any actions and event handlers passed via the 'value' prop.
*/

import React, { Component } from 'react';
import Data from '../users/Data';

const stateContext = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    //all of the app state should be here

    //all of the functions that handle state should be here 

    render() {
        //state here

        //value here

        return (
            <stateContext.Provider value={value}>

              { this.props.children } 
            </stateContext.Provider>
        );
    }
}
//{ this.props.children } is a special React prop that lets you pass components as data to other components
//it will pass and render anything that we include between the provider tags 

export const Consumer = stateContext.Consumer;


//a higher order function that automatically subscribes the component that has it to all actions and context changes
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <stateContext.Consumer>
                {context => <Component {...props} context={context} />}
            </stateContext.Consumer>
        );
    }
  }