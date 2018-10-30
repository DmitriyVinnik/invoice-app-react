import React from 'react';
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {CustomerDataForServer, Customer} from '../../../redux/customers/states';

type FormData = CustomerDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeCustomer?: Customer,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class CustomerChangeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeCustomer !== this.props.activeCustomer) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors,} = this.props;

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
    }

    private setFormValues() {
        const {activeCustomer} = this.props;

        if (activeCustomer) {
            const initialFormValue: FormData = {
                name: activeCustomer.name,
                phone: activeCustomer.phone,
                address: activeCustomer.address,
            };

            this.props.initializeForm(initialFormValue)
        }
    }
}

const validate = (values: FormData): FormErrors => {
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

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('customerChange', values));
        }
    }
);

export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'customerChange',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(CustomerChangeForm);
