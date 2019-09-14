import React, { Component } from 'react';

const stateContext = React.createContext();

export class Provider extends Component {
    //all of the app state should be here

    //all of the functions that handle state should be here 

    render() {
        return (
            <stateContext.Provider>

              { this.props.children } 
            </stateContext.Provider>
        );
    }
}
//{ this.props.children } is a special React prop that lets you pass components as data to other components
//it will pass and render anything that we include between the provider tags 

export const Consumer = stateContext.Consumer;

