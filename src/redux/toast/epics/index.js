import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {showToast} from '../AC';
import {customersRequestAC} from '../../request/nested-states/customers/AC';

const showCustomerAddFormToastEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS),
    map((action) => showToast(`Customer: ${action.payload.data.name} created successfully`))
);

const showCustomerChangeFormToastEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS),
    map((action) => showToast(`Customer: ${action.payload.data.name} updated successfully`))
);

const showCustomerDeleteFormToastEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_SUCCESS),
    map((action) => showToast(`Customer: ${action.payload.data.name} deleted successfully`))
);

const showCustomerErrorToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersGet.actionTypes.CUSTOMERS_GET_FAIL,
        customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_FAIL,
        customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_FAIL,
        customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => showToast(null, `Something went wrong! Error: ${action.payload.errors}`))
);


export const toastEpics = [
    showCustomerAddFormToastEpic,
    showCustomerChangeFormToastEpic,
    showCustomerDeleteFormToastEpic,
    showCustomerErrorToastEpic,
];