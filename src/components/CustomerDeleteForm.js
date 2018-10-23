import React from 'react';
import PropTypes from 'prop-types';

const CustomerDeleteForm = props => {
    const {name, isVisible, isLoading, errors, onSubmit} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <h2>Delete customer</h2>
            <form onSubmit={onSubmit}>
                {name && <p>You really want to delete the customer: {name}</p>}
                <div>
                    {errors && (<span>Error: {errors}</span>)}
                    <button
                        type='submit'
                        disabled={isLoading}
                    >
                        {name === null ? 'Close' : 'Delete'}
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
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default CustomerDeleteForm;
