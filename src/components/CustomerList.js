import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';


export default class CustomerList extends Component {
    static propTypes = {
        loadCustomers: PropTypes.func.isRequired,
        customers: PropTypes.shape({
            data: PropTypes.array.isRequired,
            isLoading: PropTypes.bool.isRequired,
            isLoaded: PropTypes.bool.isRequired,
            errorLoadMessage: PropTypes.string.isRequired,
            activeCustomerId: PropTypes.number,
        })
    };

    componentDidMount() {
        const {loadCustomers, customers: {isLoaded, isLoading}} = this.props;

        if (!isLoaded && !isLoading) {
            loadCustomers();
        }
    }

    render() {
        const {customers: {data, errorLoadMessage, isLoading}} = this.props;
        let customerItems;

        if (data) {
            customerItems = data.map(customer => (
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

        if (errorLoadMessage) {
            return (
                <p>Error: {errorLoadMessage}</p>
            );
        } else if (isLoading) {
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
