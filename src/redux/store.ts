import {createStore, applyMiddleware, combineReducers} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import formReducer from './form/reducers';
import {reducer as customersReducer} from './customers/reducers';
import {reducer as toastReducer} from './toast/reducers';
import {reducer as productsReducer} from './products/reducers';
import {reducer as invoicesReducer} from './invoices/reducers';
import {requestReducer} from './request/reducers';

import {requestEpics} from './request/epics';
import {customersEpics} from './customers/epics';
import {toastEpics} from './toast/epics';
import {productsEpics} from './products/epics';
import {invoicesEpics} from './invoices/epics';

import {RequestState} from './request/states';
import {ToastState} from './toast/states';
import {CustomersState} from './customers/states';
import {FormsState} from './form/states';
import {ProductsState} from './products/states';
import {InvoicesState} from './invoices/states';

declare var window: any;

export interface RootState {
    customers: CustomersState,
    form: FormsState,
    request: RequestState,
    toast: ToastState,
    products: ProductsState,
    invoices: InvoicesState,
}

const rootReducer = combineReducers({
    customers: customersReducer,
    form: formReducer,
    request: requestReducer,
    toast: toastReducer,
    products: productsReducer,
    invoices: invoicesReducer,
});

const rootEpic = combineEpics(
    ...customersEpics,
    ...requestEpics,
    ...toastEpics,
    ...productsEpics,
    ...invoicesEpics,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
