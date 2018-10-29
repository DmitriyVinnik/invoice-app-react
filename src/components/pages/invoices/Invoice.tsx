import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../../../redux/invoices/AC';

import {Dispatch} from 'redux';
import {Invoice as InvoiceInterface} from '../../../redux/invoices/states';
import {RootState} from '../../../redux/store';

type OwnProps = InvoiceInterface

interface StateProps {
    activeInvoiceId: number | null,
    invoicesData: InvoiceInterface[],
}

interface DispatchProps {
    selectActiveInvoice(data: InvoiceInterface[], id: number): void,
    resetSelectionActiveInvoice(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Invoice:React.SFC<Props> = (props: Props) => {
    const {
        id, customer_id, discount, total, activeInvoiceId, invoicesData,
        resetSelectionActiveInvoice, selectActiveInvoice,
    } = props;
    const onClickInvoice = (): void => {
        selectActiveInvoice(invoicesData, id);
    };
    const isInvoiceActive = activeInvoiceId === id;
    const onReClickInvoice = (): void => {
        resetSelectionActiveInvoice();
    };
    const invoiceStyle: React.CSSProperties = isInvoiceActive ?
        {color: 'green', paddingBottom: '20px', cursor: 'pointer'} :
        {paddingBottom: '20px', cursor: 'pointer'};

    return (
        <li onClick={!isInvoiceActive ? onClickInvoice : onReClickInvoice} style={invoiceStyle}>
            <ul style={{listStyle: 'none'}}>
                <li>Invoice id: {id}</li>
                <li>Customer id: {customer_id}</li>
                <li>Discount: {discount}</li>
                <li>Total: {total}</li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeInvoiceId: state.invoices.activeInvoiceId,
    invoicesData: state.invoices.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        selectActiveInvoice: (data, id) => {
            dispatch(Actions.selectInvoice(data, id));
        },
        resetSelectionActiveInvoice: () => {
            dispatch(Actions.resetSelectionInvoice());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Invoice)