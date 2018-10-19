import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
    loadAllCustomersEpic, postCustomerAddFormEpic, putCustomerChangeFormEpic, deleteCustomerEpic
} from './customers/epics/customers';
import customers from './customers/reducers/customers';
import form from './customers/reducers/form';

const reducer = combineReducers({
    customers,
    form,
});

const epic = combineEpics(
    loadAllCustomersEpic,
    postCustomerAddFormEpic,
    putCustomerChangeFormEpic,
    deleteCustomerEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epic);

export default store;
