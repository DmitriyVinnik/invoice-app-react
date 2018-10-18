import {combineEpics} from 'redux-observable';
import {loadAllCustomersEpic, postCustomerAddFormEpic, putCustomerChangeFormEpic, deleteCustomerEpic} from './customers';

export default combineEpics(
    loadAllCustomersEpic,
    postCustomerAddFormEpic,
    putCustomerChangeFormEpic,
    deleteCustomerEpic,
)