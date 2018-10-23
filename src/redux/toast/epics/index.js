import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {showToast} from '../AC';
import {customersRequestAC} from '../../request/nested-states/customers/AC';

const showCustomerAddFormToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS,
        customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_FAIL,
    ),
    map((action) => {
            const error = action.payload.errors ? action.payload.errors : null;
            const message = action.payload.data ?
                `Customer ${action.payload.data.name} created successfully` :
                null;

            return showToast(message, error)
        }
    )
);

const showCustomerChangeFormToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS,
        customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_FAIL,
    ),
    map((action) => {
            const error = action.payload.errors ? action.payload.errors : null;
            const message = action.payload.data ?
                `Customer ${action.payload.data.name} updated successfully` :
                null;

            return showToast(message, error)
        }
    )
);

const showCustomerDeleteFormToastEpic = action$ => action$.pipe(
    ofType(
        customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_SUCCESS,
        customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => {
            const error = action.payload.errors ? action.payload.errors : null;
            const message = action.payload.data ?
                `Customer ${action.payload.data.name} deleted successfully` :
                null;

            return showToast(message, error)
        }
    )
);


export const toastEpics = [
    showCustomerAddFormToastEpic,
    showCustomerChangeFormToastEpic,
    showCustomerDeleteFormToastEpic,
];