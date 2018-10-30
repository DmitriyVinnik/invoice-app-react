import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, initialize, FormAction, } from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {InvoiceDataForServer} from '../../../redux/invoices/states';

type FormData = InvoiceDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeCustomerId?: number,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class InvoiceAddForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeCustomerId !== this.props.activeCustomerId) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors} = this.props;

        return (
            <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <form onSubmit={handleSubmit}>
                    <h2>
                        Addition new invoice.
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
        const {activeCustomerId} = this.props;

        if (activeCustomerId) {
            const initialFormValue: FormData = {
                customer_id: activeCustomerId,
                discount: 0,
                total: 0,
            };

            this.props.initializeForm(initialFormValue)
        }
    }
}

const validate = (values: FormData) => {
    const error: FormErrors<FormData> = {};

    if (!values.discount) {
        error.discount = 'Required';
    } else if (values.discount > 1 || values.discount < 0) {
        error.discount = 'Discount must be in range from 0 to 1'
    }

    return error;
};

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('invoiceAdd', values));
        }
    }
);

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'invoiceAdd',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(InvoiceAddForm);
