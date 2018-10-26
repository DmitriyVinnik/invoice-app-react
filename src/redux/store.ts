import {createStore, applyMiddleware, combineReducers} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import formReducer from './form/reducers/index';
import {reducer as customersReducer} from './customers/reducers/index';
import {reducer as toastReducer} from './toast/reducers';
import {requestReducer} from './request/reducers';

import {requestEpics} from './request/epics';
import {customersEpics} from './customers/epics';
import {toastEpics} from './toast/epics';

import {RequestState} from './request/states';
import {ToastState} from './toast/states';
import {CustomersState} from './customers/states';
import {FormsState} from './form/states';

declare var window: any;

export interface RootState {
    customers: CustomersState,
    form: FormsState,
    request: RequestState,
    toast: ToastState,
}

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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
