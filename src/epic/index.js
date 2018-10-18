import {combineEpics} from 'redux-observable';
import {loadAllCustomersEpic, postCustomerAddFormEpic, putCustomerChangeFormEpic} from './customers';

export default combineEpics(
    loadAllCustomersEpic,
    postCustomerAddFormEpic,
    putCustomerChangeFormEpic,
)