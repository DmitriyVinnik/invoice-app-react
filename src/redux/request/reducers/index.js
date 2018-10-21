import { combineReducers } from 'redux';
import { customersReducer } from '../nested-states/customers/reducers';

export const requestReducer = combineReducers({
  customers: customersReducer,
});