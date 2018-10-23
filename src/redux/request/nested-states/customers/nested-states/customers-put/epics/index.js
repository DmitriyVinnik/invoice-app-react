import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {actionTypes, customerPutSuccess, customerPutFail} from '../AC';
import customersService from '../../../../../../../shared/services/customers.service'

export const customersPutEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_PUT),
    switchMap((action) =>
        customersService.putCustomer(action.payload).pipe(
            map(AjaxResponse => customerPutSuccess(AjaxResponse.response)),
            catchError(error => of(customerPutFail(error)))
        )
    )
);