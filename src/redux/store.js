import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import formReducer from './form/reducers';
import { reducer as customersReducer} from './customers/reducers';
import { requestReducer } from './request/reducers';

import { requestEpics } from './request/epics';
import { customersEpics } from './customers/epics';


const rootReducer = combineReducers({
    customers: customersReducer,
    form: formReducer,
    request: requestReducer,
});

const rootEpic = combineEpics(
    ...customersEpics,
    ...requestEpics,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
