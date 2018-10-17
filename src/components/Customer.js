import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {activeCustomer, resetActiveCustomer} from '../AC'

function Customer(props) {
    const { id, name, address, phone, selectCustomer, activeCustomerId, resetSelectionCustomer } = props;
    const onClickCustomer = () => {
        selectCustomer(id);
    };
    const onReClickCustomer = () => {
        resetSelectionCustomer();
    };
    const isCustomerActive = (activeCustomerId === id);
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
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    selectCustomer: PropTypes.func.isRequired,
    activeCustomerId: PropTypes.number,
    resetSelectionCustomer: PropTypes.func,
};

const mapStateToProps = state => ({
    activeCustomerId: state.customers.activeCustomerId,
});

const mapDispatchToProps = dispatch => (
    {
        selectCustomer: (id) => {
            dispatch(activeCustomer(id));
        },
        resetSelectionCustomer: () => {
            dispatch(resetActiveCustomer());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Customer)