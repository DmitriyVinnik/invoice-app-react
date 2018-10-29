import * as customersState from '../nested-states/customers/states';
import * as productsState from '../nested-states/products/states';
import * as invoicesState from '../nested-states/invoices/states';

export interface RequestState {
    customers: customersState.CustomersRequestState,
    products: productsState.ProductsRequestState,
    invoices: invoicesState.InvoicesRequestState,
}

export const initialState: RequestState = {
    customers: customersState.initialState,
    products: productsState.initialState,
    invoices: invoicesState.initialState,
};
