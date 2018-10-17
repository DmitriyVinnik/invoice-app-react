import React from 'react';
import PropTypes from 'prop-types';
import CustomerList from './CustomerList';
import {connect} from 'react-redux';
import {loadAllCustomersStart} from "../AC";

function CustomerPanel(props) {
    const {customers, loadCustomers, customers: {activeCustomerId}} = props;


    return (
        <section>
            <button type="button">Add new customer</button>
            {activeCustomerId && <button type="button">Change customer</button>}
            {activeCustomerId && <button type="button">Delete customer</button>}
            <CustomerList customers={customers} loadCustomers={loadCustomers}/>
        </section>
    )
}

CustomerPanel.propTypes = {
    loadCustomers: PropTypes.func.isRequired,
    customers: PropTypes.shape({
        data: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoaded: PropTypes.bool.isRequired,
        errorLoadMessage: PropTypes.string.isRequired,
        activeCustomerId: PropTypes.number,
    })
};

const mapStateToProps = state => ({
    customers: state.customers,
});

const mapDispatchToProps = dispatch => (
    {
        loadCustomers: () => {
            dispatch(loadAllCustomersStart());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPanel);