import {combineReducers} from 'redux';
import {reducer as customersDeleteReducer} from '../nested-states/customers-delete/reducers/index';
import {reducer as customersGetReducer} from '../nested-states/customers-get/reducers/index';
import {reducer as customersPostReducer} from '../nested-states/customers-post/reducers/index';
import {reducer as customersPutReducer} from '../nested-states/customers-put/reducers/index';

export const customersReducer = combineReducers({
    customersGet: customersGetReducer,
    customersDelete: customersDeleteReducer,
    customersPost: customersPostReducer,
    customersPut: customersPutReducer,
});