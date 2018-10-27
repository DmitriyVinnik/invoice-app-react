import * as customersState from '../nested-states/customers/states';
import * as productsState from '../nested-states/products/states';

export interface RequestState {
    customers: customersState.CustomersRequestState,
    products: productsState.ProductsRequestState,
}

export const initialState: RequestState = {
    customers: customersState.initialState,
    products: productsState.initialState,
};
