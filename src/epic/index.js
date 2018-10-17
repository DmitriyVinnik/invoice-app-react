import {combineEpics} from 'redux-observable';
import {loadAllCustomersEpic} from './customers';

export default combineEpics(
    loadAllCustomersEpic,
)