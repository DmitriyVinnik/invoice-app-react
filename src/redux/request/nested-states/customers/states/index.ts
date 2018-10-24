import {initialState as customersGetState} from '../nested-states/customers-get/states/index';
import {initialState as customersPostState} from '../nested-states/customers-post/states/index';
import {initialState as customersPutState} from '../nested-states/customers-put/states/index';
import {initialState as customersDeleteState} from '../nested-states/customers-delete/states/index';

export interface RequestNestedState {
    loading: boolean;
    loaded: boolean;
    errors: any;
    data: any;
}

export const initialState = {
    customerGet: customersGetState,
    customerPost: customersPostState,
    customerPut: customersPutState,
    customerDelete: customersDeleteState,
};