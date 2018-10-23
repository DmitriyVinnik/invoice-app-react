import {createStore, applyMiddleware, combineReducers} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import formReducer from './form/reducers';
import {reducer as customersReducer} from './customers/reducers';
import {reducer as toastReducer} from './toast/reducers';
import {requestReducer} from './request/reducers';

import {requestEpics} from './request/epics';
import {customersEpics} from './customers/epics';
import {toastEpics} from './toast/epics';


const rootReducer = combineReducers({
    customers: customersReducer,
    form: formReducer,
    request: requestReducer,
    toast: toastReducer,
});

const rootEpic = combineEpics(
    ...customersEpics,
    ...requestEpics,
    ...toastEpics,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
