import {ajax} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from  'rxjs/operators';
import {LOAD_ALL_CUSTOMERS, URL} from '../constants';
import {loadAllCustomersSuccess, loadAllCustomersFail} from '../AC'

export const loadAllCustomersEpic = action$ => action$.pipe(
    ofType(LOAD_ALL_CUSTOMERS),
    switchMap(() =>
        ajax.getJSON(URL.CUSTOMERS).pipe(
            map(response => loadAllCustomersSuccess(response)),
            catchError(error => loadAllCustomersFail(error))
        )
    )
);
