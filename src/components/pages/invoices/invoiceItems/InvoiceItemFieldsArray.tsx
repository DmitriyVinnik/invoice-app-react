import React from 'react';
import {Field, WrappedFieldArrayProps, WrappedFieldProps} from 'redux-form';
import FormField from '../../../../shared/components/FormField';
import ProductSelectElement from './ProductSelectElement';
import {ProductsState} from "../../../../redux/products/states";

export interface OwnProps {
    products: ProductsState
}

type Props = OwnProps & WrappedFieldProps & WrappedFieldArrayProps<any>

const InvoiceItemFieldsArray: React.SFC<Props> = (props: Props) => {
    const {fields, products, meta: {error}} = props;
    const handleAddButtonClick = () => fields.push({});

    return (
        <section>
            <h3>InvoiceItems: </h3>
            <button type="button" onClick={handleAddButtonClick}>
                Add new invoice item
            </button>
            <ul>
                {fields.map((productItem, index) => {
                    const handleRemoveButtonClick = () => fields.remove(index);

                    return (
                        <li key={index}>
                            <h4>{`Invoice item #${index + 1}: `}</h4>
                            <button
                                type="button"
                                title="Remove invoice item"
                                onClick={handleRemoveButtonClick}
                            >
                                Remove invoice item
                            </button>
                            <Field
                                name={`${productItem}.quantity`}
                                component={FormField}
                                type='number'
                                min='1'
                                id='add-invoiceItem-quantity'
                                labelText="InvoiceItem's quantity: "
                            />
                            <Field
                                name={`${productItem}.product_id`}
                                component={ProductSelectElement}
                                products={products}
                                id='add-invoiceItem-product'
                                label='Product: '
                            />
                        </li>
                    );
                })}
                {error && <li className="error">{error}</li>}
            </ul>
        </section>
    );
};

export default InvoiceItemFieldsArray;
