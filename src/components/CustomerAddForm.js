import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';

const CustomerAddForm = props => {
    const {isVisible, handleSubmit, isLoading, errorMessage} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <form onSubmit={handleSubmit}>
                <h2>
                    Addition new customer.
                </h2>
                <Field
                    name='name'
                    component={FormField}
                    type='text'
                    id='add-customer-name'
                    labelText="Customer's name: "
                />
                <Field
                    name='address'
                    component={FormField}
                    type='text'
                    id='add-customer-address'
                    labelText="Customer's address: "
                />
                <Field
                    name='phone'
                    component={FormField}
                    type='tel'
                    id='add-customer-phone'
                    labelText="Customer's phone: "
                />
                <div>
                    {errorMessage && (<span>Error: {errorMessage}</span>)}
                    <button
                        type='submit'
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

CustomerAddForm.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const validate = (values) => {
    const error = {};

    if (!values.name) {
        error.name = 'Required';
    }

    if (!values.address) {
        error.address = 'Required';
    }

    if (!values.phone) {
        error.phone = 'Required';
    }

    return error;
};

export default reduxForm({
    form: 'customerAdd',
    validate,
})(CustomerAddForm);
