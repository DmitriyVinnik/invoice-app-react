import {ajax} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {mergeMap, map, catchError} from  'rxjs/operators';
import {LOAD_ALL_CUSTOMERS, START, URL} from '../constants';
import {loadAllCustomersSuccess, loadAllCustomersFail} from '../AC'

export const loadAllCustomersEpic = action$ => action$.pipe(
    ofType(LOAD_ALL_CUSTOMERS + START),
    mergeMap(() =>
        ajax.getJSON(URL.CUSTOMERS).pipe(
            map(response => loadAllCustomersSuccess(response)),
            catchError(error => loadAllCustomersFail(error))
        )
    )
);
