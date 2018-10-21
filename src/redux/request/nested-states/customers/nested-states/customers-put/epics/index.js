import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from  'rxjs/operators';
import { customersUpdateData } from '../../customers-get/AC';
import { actionTypes, customerPutSuccess, customerPutFail } from '../AC';
import customersService from '../../../../../../../shared/services/customers.service'

export const customersPutEpic = (action$, state$) => action$.pipe(
    ofType(actionTypes.CUSTOMERS_PUT),
    switchMap((action) =>
        customersService.putCustomer(action.payload).pipe(
            map(AjaxResponse => customerPutSuccess(AjaxResponse.response)),
            map(response => {
              const currentCustomersData = state$.value.request.customers.customersGet.data;
              const changedCustomerIndex = currentCustomersData.findIndex(elem => elem.id === response.id);
              const newCustomersData = [...currentCustomersData];
              newCustomersData.splice(changedCustomerIndex, 1, response);

              return customersUpdateData(newCustomersData);
            }),
            catchError(error => customerPutFail(error))
        )
    )
);