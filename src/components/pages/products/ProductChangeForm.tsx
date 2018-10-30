import React from 'react';
import {compose, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, Field, InjectedFormProps, FormErrors, FormAction, initialize} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {Product, ProductDataForServer} from '../../../redux/products/states';

type FormData = ProductDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    activeProduct?: Product,
}

interface DispatchProps {
    initializeForm: (values: FormData) => void
}

type Props = OwnProps & DispatchProps & InjectedFormProps<FormData, OwnProps>

class ProductChangeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    public componentDidMount() {
        this.setFormValues()
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.activeProduct !== this.props.activeProduct) {
            this.setFormValues()
        }
    }

    public render() {
        const {isVisible, handleSubmit, isLoading, errors,} = this.props;

        return (
            <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
                <form onSubmit={handleSubmit}>
                    <h2>
                        Change product.
                    </h2>
                    <Field
                        name='name'
                        component={FormField}
                        type='text'
                        id='change-product-name'
                        labelText="Product's name: "
                    />
                    <Field
                        name='price'
                        component={FormField}
                        type='number'
                        step={0.01}
                        id='change-product-price'
                        labelText="Product's price: "
                        placeholder='decimal'
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
        const {activeProduct} = this.props;

        if (activeProduct) {
            const initialFormValue: FormData = {
                name: activeProduct.name,
                price: activeProduct.price,
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

    if (!values.price) {
        error.price = 'Required';
    } else if (((values.price * 100) % 100) % 1 !== 0) {
        error.price = 'Price must be in decimal format'
    }

    return error;
};

const mapDispatchToProps = (dispatch: Dispatch<FormAction>): DispatchProps => (
    {
        initializeForm: (values) => {
            dispatch(initialize('productChange', values));
        }
    }
);



export default compose(
    reduxForm<FormData, OwnProps>({
        form: 'productChange',
        validate,
    }),
    connect<DispatchProps>(null, mapDispatchToProps)
)(ProductChangeForm);
