import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {actionTypes, customerDeleteSuccess, customerDeleteFail} from '../AC/index';
import customersService from '../../../../../../../shared/services/customers.service';

export const customersDeleteEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_DELETE),
    switchMap((action) =>
        customersService.deleteCustomer(action.payload).pipe(
            map(AjaxResponse => customerDeleteSuccess(AjaxResponse.response)),
            catchError(error => of(customerDeleteFail(error.xhr.response)))
        )
    )
);