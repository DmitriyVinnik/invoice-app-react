import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectCustomer, resetSelectionCustomer} from '../redux/customers/AC/index'

function Customer(props) {
    const {
        id, name, address, phone, selectActiveCustomer, activeCustomerId, resetSelectionActiveCustomer, customersData
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
}

Customer.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    selectActiveCustomer: PropTypes.func.isRequired,
    activeCustomerId: PropTypes.number,
    resetSelectionActiveCustomer: PropTypes.func,
    customersData: PropTypes.array,
};

const mapStateToProps = state => ({
    activeCustomerId: state.customers.activeCustomerId,
    customersData: state.customers.data,
});

const mapDispatchToProps = dispatch => (
    {
        selectActiveCustomer: (data, id) => {
            dispatch(selectCustomer(data, id));
        },
        resetSelectionActiveCustomer: () => {
            dispatch(resetSelectionCustomer());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Customer)