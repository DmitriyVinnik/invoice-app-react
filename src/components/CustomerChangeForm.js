import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';

const CustomerChangeForm = props => {
    const {isVisible, handleSubmit, isLoading, errors, } = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <form onSubmit={handleSubmit}>
                <h2>
                    Change customer.
                </h2>
                <Field
                    name='name'
                    component={FormField}
                    type='text'
                    id='change-customer-name'
                    labelText="Customer's name: "
                />
                <Field
                    name='address'
                    component={FormField}
                    type='text'
                    id='change-customer-address'
                    labelText="Customer's address: "
                />
                <Field
                    name='phone'
                    component={FormField}
                    type='tel'
                    id='change-customer-phone'
                    labelText="Customer's phone: "
                />
                <div>
                    {errors && (<span>Error: {errors}</span>)}
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

CustomerChangeForm.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.object,
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
    form: 'customerChange',
    validate,
})(CustomerChangeForm);
