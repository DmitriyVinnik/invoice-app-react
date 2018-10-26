import React from 'react';
import Redux from 'redux';
import {connect} from 'react-redux';
import {Actions} from '../redux/customers/AC';
import {Customer as CustomerInterface} from '../redux/customers/states';
import {RootState} from '../redux/store';

export interface OwnProps extends CustomerInterface {
}

interface StateProps {
    activeCustomerId: number | null,
    customersData: CustomerInterface[],
}

interface DispatchProps {
    selectActiveCustomer(data: CustomerInterface[], id: number): void,
    resetSelectionActiveCustomer(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Customer:React.SFC<Props> = (props: Props) => {
    const {
        id, name, address, phone, activeCustomerId, customersData,
        resetSelectionActiveCustomer, selectActiveCustomer,
    } = props;
    const onClickCustomer = () => {
        selectActiveCustomer(customersData, id);
    };
    const isCustomerActive = (activeCustomerId === id);
    const onReClickCustomer = () => {
        resetSelectionActiveCustomer();
    };
    const customerStyle = isCustomerActive ?
        {color: 'green', paddingBottom: '20px', cursor: 'pointer'} :
        {paddingBottom: '20px', cursor: 'pointer'};

    return (
        <li onClick={!isCustomerActive ? onClickCustomer : onReClickCustomer} style={customerStyle}>
            <ul style={{listStyle: 'none'}}>
                <li>Name: {name}, id: {id}</li>
                <li>Address: {address}</li>
                <li>Phone: {phone}</li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeCustomerId: state.customers.activeCustomerId,
    customersData: state.customers.data,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Actions>): DispatchProps => (
    {
        selectActiveCustomer: (data, id) => {
            dispatch(Actions.selectCustomer(data, id));
        },
        resetSelectionActiveCustomer: () => {
            dispatch(Actions.resetSelectionCustomer());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Customer)