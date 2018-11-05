import React from 'react';

import {InvoiceItem as InvoiceItemInterface} from '../../../../redux/invoiceItems/states';

type OwnProps = InvoiceItemInterface


const InvoiceItem: React.SFC<OwnProps> = (props: OwnProps) => {
    const {
        id, quantity, invoice_id, product_id,
    } = props;

    return (
        <li className='entity-list__sub-item'>
            <ul className='invoice-items-list'>
                <li>
                    InvoiceItem id:
                    <span className='invoice-item-list__title'> {id}</span>
                </li>
                <li>
                    Invoice id:
                    <span className='invoice-item-list__title'> {invoice_id}</span>
                </li>
                <li>
                    Product id:
                    <span className='invoice-item-list__title'> {product_id}</span>
                </li>
                <li>
                    Quantity:
                    <span className='invoice-item-list__title'> {quantity}</span>
                </li>
            </ul>
        </li>
    );
};

export default InvoiceItem;