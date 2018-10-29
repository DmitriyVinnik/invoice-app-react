import React from 'react';
import {reduxForm, Field, InjectedFormProps, FormErrors} from 'redux-form';
import FormField from '../../../shared/components/FormField';
import {ProductDataForServer} from '../../../redux/products/states';

type FormData = ProductDataForServer

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
}

type Props = OwnProps & InjectedFormProps<FormData, OwnProps>

const ProductChangeForm:React.SFC<Props> = (props: Props) => {
    const {isVisible, handleSubmit, isLoading, errors,} = props;

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
};

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

export default reduxForm<FormData, OwnProps>({
    form: 'productChange',
    validate,
})(ProductChangeForm);
