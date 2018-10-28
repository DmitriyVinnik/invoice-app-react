import React, {Component} from 'react';
import Customer from './Customer';
import {Customer as CustomerInterface} from '../../../redux/customers/states';
import {RequestNestedState} from '../../../redux/request/nested-states/customers/states';

export interface OwnProps {
    customersData: CustomerInterface[],
    customersRequest: RequestNestedState;
    loadCustomers(): void,
}

export default class CustomerList extends Component<OwnProps> {

    public componentDidMount() {
        const {loadCustomers} = this.props;

        loadCustomers();
    }

    public render() {
        const {customersRequest: {errors, loading, loaded}, customersData} = this.props;
        let customerItems: React.ReactNode | null;

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
                <p>Wait a second, loading...</p>
            );
        } else  if (!loaded) {
            return (
                <p>Something went wrong! Customers have not loaded, try reloading the page</p>
            )
        }

        return (
            <ul style={{listStyle: 'none'}}>
                {customerItems}
            </ul>
        )
    }
}
