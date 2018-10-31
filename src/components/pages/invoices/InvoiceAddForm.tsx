import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {
    reduxForm, Field, FieldArray, initialize,
    InjectedFormProps, FormErrors, FormAction,
} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import InvoiceItemFieldsArray from './invoiceItems/InvoiceItemFieldsArray';

import {InvoiceDataForServer} from '../../../redux/invoices/states';
import {InvoiceItemDataForServer} from '../../../redux/invoiceItems/states';
import {ProductsState} from "../../../redux/products/states";
import {RootState} from "../../../redux/store";

interface FormData extends InvoiceDataForServer {
    invoiceItems: InvoiceItemDataForServer[]
}

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeCustomerId?: number,
}

interface StateProps {
    products: ProductsState,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

interface State {
    total: number,
}

type Props = OwnProps & StateProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class InvoiceAddForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            total: 0,
        }
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
        const {isVisible, handleSubmit, isLoading, errors, products, activeCustomerId} = this.props;
        const {total} = this.state;

        return (
            <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <form onSubmit={handleSubmit}>
                    <section>
                        <h2>
                            Addition new invoice.
                            <span>{`Invoice's customer ID: ${activeCustomerId}`}</span>
                        </h2>
                        <strong>{`Invoice's total: ${total}`}</strong>
                        <Field
                            name='discount'
                            component={FormField}
                            type='number'
                            step='0.01'
                            min='0'
                            id='add-invoice-discount'
                            labelText="Invoice's discount: "
                            placeholder='From 0 to 1'
                        />
                    </section>
                    <FieldArray
                        name='invoiceItems'
                        component={InvoiceItemFieldsArray}
                        products={products}
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
                invoiceItems: [],
            };

            this.props.initializeForm(initialFormValue)
        }
    }
}

const validate = (values: FormData) => {
    const errors: FormErrors<FormData, any> = {};

    if (!values.discount) {
        errors.discount = 'Required';
    } else if (values.discount > 1 || values.discount < 0) {
        errors.discount = 'Discount must be in range from 0 to 1'
    }

    if (!values.invoiceItems || !values.invoiceItems.length) {
        errors.invoiceItems = {_error: 'At least one member must be entered'}
    } else {
        const invoiceItemsArrayErrors: Array<FormErrors<InvoiceItemDataForServer>> = [];

        values.invoiceItems.forEach((invoiceItem, invoiceItemIndex) => {
            const invoiceItemErrors: FormErrors<InvoiceItemDataForServer> = {};

            if (!invoiceItem || !invoiceItem.quantity) {
                invoiceItemErrors.quantity = 'Required';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            } else if (invoiceItem.quantity % 1 !== 0) {
                invoiceItemErrors.quantity = 'Value must be an integer';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            }

            if (!invoiceItem || !invoiceItem.product_id) {
                invoiceItemErrors.product_id = 'Required';
                invoiceItemsArrayErrors[invoiceItemIndex] = invoiceItemErrors;
            }
        });

        if (invoiceItemsArrayErrors.length) {
            errors.invoiceItems = invoiceItemsArrayErrors
        }
    }
    return errors
};

const mapStateToProps = (state: RootState): StateProps => ({
    products: state.products,
});

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
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(InvoiceAddForm);
