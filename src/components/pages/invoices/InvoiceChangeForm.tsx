import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {Invoice, InvoiceDataForServer} from '../../../redux/invoices/states';

type FormData = InvoiceDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeInvoice?: Invoice,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class InvoiceChangeForm extends React.Component<Props> {

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeInvoice !== this.props.activeInvoice) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors,} = this.props;

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
    }

    private setFormValues() {
        const {activeInvoice} = this.props;

        if (activeInvoice) {
            const initialFormValue: FormData = {
                discount: activeInvoice.discount,
                customer_id: activeInvoice.customer_id,
                total: activeInvoice.total,
            };

            this.props.initializeForm(initialFormValue)
        }
    }
}

const validate = (values: FormData): FormErrors => {
    const error: FormErrors<FormData> = {};

    if (values.discount !== 0 && !values.discount) {
        error.discount = 'Required';
    } else if (values.discount > 1 || values.discount < 0) {
        error.discount = 'Discount must be in range from 0 to 1'
    }

    return error;
};

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('invoiceChange', values));
        }
    }
);

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'invoiceChange',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(InvoiceChangeForm);
