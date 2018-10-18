import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {activeCustomer, resetActiveCustomer} from '../AC'

function Customer(props) {
    const { id, name, address, phone, selectCustomer, activeCustomerId, resetSelectionCustomer, customersData } = props;
    const onClickCustomer = () => {
      selectCustomer(id, customersData);
    };
    const isCustomerActive = (activeCustomerId === id);
    const onReClickCustomer = () => {
        resetSelectionCustomer();
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
}

Customer.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    selectCustomer: PropTypes.func.isRequired,
    activeCustomerId: PropTypes.number,
    resetSelectionCustomer: PropTypes.func,
    customersData: PropTypes.array,
};

const mapStateToProps = state => ({
    activeCustomerId: state.customers.activeCustomerId,
    customersData: state.customers.data,
});

const mapDispatchToProps = dispatch => (
    {
        selectCustomer: (id, data) => {
            dispatch(activeCustomer(id, data));
        },
        resetSelectionCustomer: () => {
            dispatch(resetActiveCustomer());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Customer)