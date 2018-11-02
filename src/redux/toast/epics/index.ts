import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import * as customers from '../../request/nested-states/customers/AC';
import * as products from '../../request/nested-states/products/AC';
import * as invoices from '../../request/nested-states/invoices/AC';
import * as invoiceItems from '../../request/nested-states/invoiceItems/AC';
import * as fromActions from '../AC';

const showCustomerSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<customers.RequestActionsSuccess>(
        customers.customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS,
        customers.customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS,
        customers.customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case customers.customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case customers.customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Customer: ${name} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case customers.customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_SUCCESS: {
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
    ofType<customers.RequestActionsFail>(
        customers.customersRequestAC.customersGet.ActionTypes.CUSTOMERS_GET_FAIL,
        customers.customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_FAIL,
        customers.customersRequestAC.customersPut.ActionTypes.CUSTOMERS_PUT_FAIL,
        customers.customersRequestAC.customersDelete.ActionTypes.CUSTOMERS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing customers request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);

const showProductSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<products.RequestActionsSuccess>(
        products.productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS,
        products.productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS,
        products.productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case products.productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Product: ${name} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case products.productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_SUCCESS: {
                const name = action.payload.data.name;
                const message = `Product: ${name} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case products.productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_SUCCESS: {
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
    ofType<products.RequestActionsFail>(
        products.productsRequestAC.productsGet.ActionTypes.PRODUCTS_GET_FAIL,
        products.productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_FAIL,
        products.productsRequestAC.productsPut.ActionTypes.PRODUCTS_PUT_FAIL,
        products.productsRequestAC.productsDelete.ActionTypes.PRODUCTS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing products request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);

const showInvoiceSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<invoices.RequestActionsSuccess>(
        invoices.invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS,
        invoices.invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS,
        invoices.invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case invoices.invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS: {
                const id = action.payload.data.id;
                const message = `Invoice - id: ${id} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case invoices.invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_SUCCESS: {
                const id = action.payload.data.id;
                const message = `Invoice: ${id} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case invoices.invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_SUCCESS: {
                const id = action.payload.data.id;
                const message = `Invoice: ${id} deleted successfully`;

                return fromActions.Actions.showToast(message)
            }

            default:
                return null;
        }
    })
);

const showInvoiceErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<invoices.RequestActionsFail>(
        invoices.invoicesRequestAC.invoicesGet.ActionTypes.INVOICES_GET_FAIL,
        invoices.invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_FAIL,
        invoices.invoicesRequestAC.invoicesPut.ActionTypes.INVOICES_PUT_FAIL,
        invoices.invoicesRequestAC.invoicesDelete.ActionTypes.INVOICES_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing invoices request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);

const showInvoiceItemSuccessRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<invoiceItems.RequestActionsSuccess>(
        invoiceItems.invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS,
        invoiceItems.invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS,
        invoiceItems.invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case invoiceItems.invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS: {
                const arrayId = action.payload.data.map<number>((invoiceItem) => invoiceItem.id);
                const message = `InvoiceItems - id: ${arrayId.join(', id: ')} created successfully`;

                return fromActions.Actions.showToast(message)
            }

            case invoiceItems.invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS: {
                const arrayId = action.payload.data.map<number>((invoiceItem) => invoiceItem.id);
                const message = `InvoiceItem: ${arrayId.join(', id: ')} updated successfully`;

                return fromActions.Actions.showToast(message)
            }

            case invoiceItems.invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS: {
                const arrayId = action.payload.data.map<number>((invoiceItem) => invoiceItem.id);
                const message = `InvoiceItem: ${arrayId.join(', id: ')} deleted successfully`;

                return fromActions.Actions.showToast(message)
            }

            default:
                return null;
        }
    })
);

const showInvoiceItemErrorRequestToastEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<invoiceItems.RequestActionsFail>(
        invoiceItems.invoiceItemsRequestAC.invoiceItemsGet.ActionTypes.INVOICE_ITEMS_GET_FAIL,
        invoiceItems.invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_FAIL,
        invoiceItems.invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_FAIL,
        invoiceItems.invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_FAIL,
    ),
    map((action) => {
        const requestError = action.payload.errors;
        const error = `something went wrong while processing invoiceItems request! Error: ${requestError}`;

        return fromActions.Actions.showToast(null, error)
    })
);


export const toastEpics = [
    showCustomerSuccessRequestToastEpic,
    showCustomerErrorRequestToastEpic,
    showProductSuccessRequestToastEpic,
    showProductErrorRequestToastEpic,
    showInvoiceSuccessRequestToastEpic,
    showInvoiceErrorRequestToastEpic,
    showInvoiceItemSuccessRequestToastEpic,
    showInvoiceItemErrorRequestToastEpic,
];