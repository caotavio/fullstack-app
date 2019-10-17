/*
  this file renders and handles the functionality of the submit and cancel buttons
  as well as rendering any validation errors from the API.
*/

import React from 'react';

export default (props) => {
    const {
        submit,
        errors,
        cancel,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        submit();
    }

    function handleCancel(e) {
        e.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}