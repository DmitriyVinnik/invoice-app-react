import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../../../../redux/invoiceItems/AC';

import {Dispatch} from 'redux';
import {InvoiceItem as InvoiceItemInterface} from '../../../../redux/invoiceItems/states';
import {RootState} from '../../../../redux/store';

type OwnProps = InvoiceItemInterface

interface StateProps {
    activeInvoiceItemId: number | null,
}

interface DispatchProps {
    selectActiveInvoiceItem(id: number): void,
    resetSelectionActiveInvoiceItem(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const InvoiceItemItem:React.SFC<Props> = (props: Props) => {
    const {
        id, quantity, invoice_id, product_id, activeInvoiceItemId,
        resetSelectionActiveInvoiceItem, selectActiveInvoiceItem,
    } = props;
    const onClickInvoiceItem = (): void => {
        selectActiveInvoiceItem(id);
    };
    const isInvoiceItemActive = activeInvoiceItemId === id;
    const onReClickInvoiceItem = (): void => {
        resetSelectionActiveInvoiceItem();
    };
    const invoiceItemStyle: React.CSSProperties = isInvoiceItemActive ?
        {color: 'green', paddingBottom: '20px', cursor: 'pointer'} :
        {paddingBottom: '20px', cursor: 'pointer'};

    return (
        <li onClick={!isInvoiceItemActive ? onClickInvoiceItem : onReClickInvoiceItem} style={invoiceItemStyle}>
            <ul style={{listStyle: 'none'}}>
                <li>InvoiceItem id: {id}</li>
                <li>Invoice id: {invoice_id}</li>
                <li>Product id: {product_id}</li>
                <li>Quantity: {quantity}</li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeInvoiceItemId: state.invoiceItems.activeInvoiceItemId,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        selectActiveInvoiceItem: (id) => {
            dispatch(Actions.selectInvoiceItem(id));
        },
        resetSelectionActiveInvoiceItem: () => {
            dispatch(Actions.resetSelectionInvoiceItem());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoiceItemItem)