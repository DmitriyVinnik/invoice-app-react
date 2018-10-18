import React from 'react';
import PropTypes from 'prop-types';

const CustomerDeleteForm = props => {
    const {name, isVisible, isLoading, errorMessage, onSubmit} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <h2>Delete customer</h2>
            <form onSubmit={onSubmit}>
                <p>You really want to delete the customer: {name}</p>
                <div>
                    {errorMessage && (<span>Error: {errorMessage}</span>)}
                    <button
                        type='submit'
                        disabled={isLoading}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

CustomerDeleteForm.propTypes = {
    name: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CustomerDeleteForm;
