import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormErrors} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {InvoiceDataForServer} from '../../../redux/invoices/states';

type FormData = InvoiceDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>

const InvoiceChangeForm:React.SFC<Props> = (props: Props) => {
    const {isVisible, handleSubmit, isLoading, errors,} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <form onSubmit={handleSubmit}>
                <h2>
                    Change invoice.
                </h2>
                <Field
                    name='discount'
                    component={FormField}
                    type='number'
                    step='0.01'
                    id='add-invoice-discount'
                    labelText="Invoice's discount: "
                    placeholder='From 0 to 1'
                />
                <Field
                    name='customer_id'
                    disabled
                    component={FormField}
                    type='number'
                    step='0.01'
                    id='add-invoice-customer-id'
                    labelText="Invoice's customer ID: "
                />
                <Field
                    name='total'
                    disabled
                    component={FormField}
                    type='number'
                    step='0.01'
                    id='add-invoice-total'
                    labelText="Invoice's total: "
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

const validate = (values: FormData): FormErrors => {
    const error: FormErrors<FormData> = {};

    if (!values.discount) {
        error.discount = 'Required';
    } else if (values.discount > 1 || values.discount < 0) {
        error.discount = 'Discount must be in range from 0 to 1'
    }

    return error;
};

export default reduxForm<FormData, OwnProps>({
    form: 'invoiceChange',
    validate,
})(InvoiceChangeForm);
