import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {actionTypes, customersGetSuccess, customersGetFail} from '../AC';
import customersService from '../../../../../../../shared/services/customers.service'

export const customersGetEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_GET),
    switchMap(() =>
        customersService.getCustomer().pipe(
            map(response => customersGetSuccess(response)),
            catchError(error => of(customersGetFail(error)))
        )
    )
);