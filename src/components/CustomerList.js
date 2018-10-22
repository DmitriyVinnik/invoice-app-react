import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';

export default class CustomerList extends Component {
    static propTypes = {
        loadCustomers: PropTypes.func.isRequired,
        customersData: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            address: PropTypes.string,
            phone: PropTypes.string,
        })),
        customersRequest: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            loaded: PropTypes.bool.isRequired,
            errors: PropTypes.object,
        })
    };

    componentDidMount() {
        const {loadCustomers, customersRequest: {loaded, loading}} = this.props;

        if (!loaded && !loading) {
            loadCustomers();
        }
    }

    render() {
        const {customersRequest: {errors, loading}, customersData} = this.props;
        let customerItems;

        if (customersData) {
            customerItems = customersData.map(customer => (
                <Customer
                    id={customer.id}
                    name={customer.name}
                    address={customer.address}
                    phone={customer.phone}
                    key={customer.id}
                />
            ));
        } else {
            customerItems = null;
        }

        if (errors) {
            return (
                <p>Error: {errors}</p>
            );
        } else if (loading) {
            return (
                <p>Wait a second, loading..."</p>
            );
        }

        return (
            <ul style={{listStyle: 'none'}}>
                {customerItems}
            </ul>
        )
    }
}
