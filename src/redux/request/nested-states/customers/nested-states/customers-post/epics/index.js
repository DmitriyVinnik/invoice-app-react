import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from  'rxjs/operators';
import { customersUpdateData} from '../../customers-get/AC';
import { actionTypes, customersPostSuccess, customersPostFail } from '../AC';
import customersService from '../../../../../../../shared/services/customers.service'

export const customersPostEpic = (action$, state$) => action$.pipe(
    ofType(actionTypes.CUSTOMERS_GET),
    switchMap((action) =>
        customersService.postCustomer(action.payload).pipe(
            map(AjaxResponse => customersPostSuccess(AjaxResponse.response)),
            map(response => {
              const currentCustomersData = state$.value.request.customers.customersGet.data;
              const newCustomersData = [...currentCustomersData, response];

              return customersUpdateData(newCustomersData);
            }),
            catchError(error => customersPostFail(error))
        )
    )
);