import {initialState as customersGetState} from '../nested-states/customers-get/states';
import {initialState as customersPostState} from '../nested-states/customers-post/states';
import {initialState as customersPutState} from '../nested-states/customers-put/states';
import {initialState as customersDeleteState} from '../nested-states/customers-delete/states';

export const initialState = {
    customerGet: customersGetState,
    customerPost: customersPostState,
    customerPut: customersPutState,
    customerDelete: customersDeleteState,
};