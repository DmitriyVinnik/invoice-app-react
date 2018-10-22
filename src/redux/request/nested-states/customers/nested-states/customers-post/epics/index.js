import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from  'rxjs/operators';
import { actionTypes, customersPostSuccess, customersPostFail } from '../AC';
import customersService from '../../../../../../../shared/services/customers.service'

export const customersPostEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_POST),
    switchMap((action) =>
        customersService.postCustomer(action.payload).pipe(
            map(AjaxResponse => customersPostSuccess(AjaxResponse.response)),
            catchError(error => customersPostFail(error))
        )
    )
);