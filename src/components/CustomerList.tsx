import React, {Component} from 'react';
import Customer from './Customer';
import {Customer as CustomerInterface} from '../redux/customers/states';
import {RequestNestedState} from '../redux/request/nested-states/customers/states';

export interface OwnProps {
    customersData: CustomerInterface[],
    customersRequest: RequestNestedState;
    loadCustomers(): void,
}

export default class CustomerList extends Component<OwnProps> {

    public componentDidMount() {
        const {loadCustomers, customersRequest: {loaded, loading}} = this.props;

        if (!loaded && !loading) {
            loadCustomers();
        }
    }

    public render() {
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
