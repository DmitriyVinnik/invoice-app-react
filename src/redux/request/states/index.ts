import * as customersState from '../nested-states/customers/states';

export interface RequestState {
    customers?: customersState.CustomersRequestState,
}

export const initialState: RequestState = {
    customers: customersState.initialState,
};
