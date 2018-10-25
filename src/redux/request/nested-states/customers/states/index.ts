import {initialState as customersGetState} from '../nested-states/customers-get/states';
import {initialState as customersPostState} from '../nested-states/customers-post/states';
import {initialState as customersPutState} from '../nested-states/customers-put/states';
import {initialState as customersDeleteState} from '../nested-states/customers-delete/states';
import {Customer} from '../../../../customers/states';

export interface RequestNestedState {
    loading?: boolean;
    loaded?: boolean;
    errors?: any;
    data?: Customer[] | Customer | null;
}

export interface CustomersRequestState {
    customerGet: RequestNestedState,
    customerPost: RequestNestedState,
    customerPut: RequestNestedState,
    customerDelete: RequestNestedState,
}

export const initialState: CustomersRequestState = {
    customerGet: customersGetState,
    customerPost: customersPostState,
    customerPut: customersPutState,
    customerDelete: customersDeleteState,
};