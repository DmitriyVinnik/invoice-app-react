import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {
    customersRequestAC, RequestActionsSuccess as RequestCustomersActionsSuccess,
    RequestActionsFail as RequestCustomersActionsFail,
} from '../../request/nested-states/customers/AC';
import {
    productsRequestAC, RequestActionsSuccess as RequestProductsActionsSuccess,
    RequestActionsFail as RequestProductsActionsFail
} from '../../request/nested-states/products/AC';
import * as fromActions from '../AC';

const showCustomerSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestCustomersActionsSuccess>(
        customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS,
        customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS,
        customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} deleted successfully`;

                return fromActions.Actions.showToast(message)
            }

            default:
                return null;
        }
    })
);

const showCustomerErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestCustomersActionsFail>(
        customersRequestAC.customersGet.ActionTypes.CUSTOMERS_GET_FAIL,
        customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_FAIL,
        customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_FAIL,
        customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing customers request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);

const showProductSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestProductsActionsSuccess>(
        productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS,
        productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS,
        productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Product: ${name} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Product: ${name} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Product: ${name} deleted successfully`;

                return fromActions.Actions.showToast(message)
            }

            default:
                return null;
        }
    })
);

const showProductErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestProductsActionsFail>(
        productsRequestAC.productsGet.ActionTypes.PRODUCTS_GET_FAIL,
        productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_FAIL,
        productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_FAIL,
        productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing products request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);

export const toastEpics = [
    showCustomerSuccessRequestToastEpic,
    showCustomerErrorRequestToastEpic,
    showProductSuccessRequestToastEpic,
    showProductErrorRequestToastEpic,
];