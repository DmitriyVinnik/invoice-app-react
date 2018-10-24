import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {showToast} from '../AC';
import {customersRequestAC} from '../../request/nested-states/customers/AC/index';

const showCustomerSuccessRequestToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS,
        customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS,
        customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_SUCCESS,
    ),
    map((action) => {
        const {type, payload} = action;

        switch (type) {
            case customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS: {
               return showToast(`Customer: ${payload.data.name} created successfully`)
            }

            case customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS: {
                return showToast(`Customer: ${payload.data.name} updated successfully`)
            }

            case customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_SUCCESS: {
                return showToast(`Customer: ${payload.data.name} deleted successfully`)
            }

            default:
                return null;
        }
    })
);

const showCustomerErrorRequestToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersGet.actionTypes.CUSTOMERS_GET_FAIL,
        customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_FAIL,
        customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_FAIL,
        customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => showToast(null, `Something went wrong! Error: ${action.payload.errors}`))
);

export const toastEpics = [
    showCustomerSuccessRequestToastEpic,
    showCustomerErrorRequestToastEpic,
];