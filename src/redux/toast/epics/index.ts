import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {customersRequestAC, RequestActionsSuccess, RequestActionsFail} from '../../request/nested-states/customers/AC';
import * as fromActions from '../AC';

const showCustomerSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS,
        customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS,
        customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} created successfully`;

                return fromActions.Actions.showToast({message})
            }

            case customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} updated successfully`;

                return fromActions.Actions.showToast({message})
            }

            case customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} deleted successfully`;

                return fromActions.Actions.showToast({message})
            }

            default:
                return null;
        }
    })
);

const showCustomerErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsFail>(
        customersRequestAC.customersGet.ActionTypes.CUSTOMERS_GET_FAIL,
        customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_FAIL,
        customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_FAIL,
        customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `Something went wrong! Error: ${requestError}`;

        return fromActions.Actions.showToast({error})
    })
);

export const toastEpics = [
    showCustomerSuccessRequestToastEpic,
    showCustomerErrorRequestToastEpic,
];