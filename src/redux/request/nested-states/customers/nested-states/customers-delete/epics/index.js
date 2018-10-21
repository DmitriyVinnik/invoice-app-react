import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from  'rxjs/operators';
import { customersUpdateData} from '../../customers-get/AC';
import { actionTypes, customerDeleteSuccess, customerDeleteFail } from '../AC';
import customersService from '../../../../../../../shared/services/customers.service';

export const customersDeleteEpic = (action$, state$) => action$.pipe(
    ofType(actionTypes.CUSTOMERS_DELETE),
    switchMap((action) =>
        customersService.deleteCustomer(action.payload).pipe(
            map(AjaxResponse => customerDeleteSuccess(AjaxResponse.response)),
            map(response => {
              const currentCustomersData = state$.value.request.customers.customersGet.data;
              const newCustomersData = currentCustomersData.filter(elem => elem.id !== response.id);

              return customersUpdateData(newCustomersData);
            }),
            catchError(error => customerDeleteFail(error))
        )
    )
);