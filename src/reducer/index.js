import { combineReducers } from 'redux';
import customers from './customers';
import form from './form';

export default combineReducers({
    customers,
    form,
});