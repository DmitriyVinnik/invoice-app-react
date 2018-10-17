import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from '../reducer';
import epic from '../epic';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epic);

export default store;