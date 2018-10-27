import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormErrors} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {CustomerDataForServer} from '../../../redux/customers/states';

type FormData = CustomerDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>

const CustomerAddForm:React.SFC<Props> = (props: Props) => {
    const {isVisible, handleSubmit, isLoading, errors} = props;

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

const validate = (values: FormData) => {
    const error: FormErrors<FormData> = {};

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

export default reduxForm<FormData, OwnProps>({
    form: 'customerAdd',
    validate,
})(CustomerAddForm);
