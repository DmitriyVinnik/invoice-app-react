import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import * as fromActions from '../AC';
import {invoiceItemsRequestAC, RequestActionsSuccess} from '../../request/nested-states/invoiceItems/AC';

const loadAllInvoiceItemsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.LoadAction>(fromActions.ActionTypes.INVOICE_ITEMS_LOAD_ALL),
    map((action) => invoiceItemsRequestAC.invoiceItemsGet.Actions.invoiceItemsGet(action.payload.invoice_id))
);

const updateInvoiceItemsDataEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<RequestActionsSuccess>(
        invoiceItemsRequestAC.invoiceItemsGet.ActionTypes.INVOICE_ITEMS_GET_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS,
        invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS,
    ),
    map((action) => {

        switch (action.type) {
            case invoiceItemsRequestAC.invoiceItemsGet.ActionTypes.INVOICE_ITEMS_GET_SUCCESS:
            case invoiceItemsRequestAC.invoiceItemsPost.ActionTypes.INVOICE_ITEMS_POST_SUCCESS:
            case invoiceItemsRequestAC.invoiceItemsPut.ActionTypes.INVOICE_ITEMS_PUT_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.setInvoiceItemsData(data)
            }

            case invoiceItemsRequestAC.invoiceItemsDelete.ActionTypes.INVOICE_ITEMS_DELETE_SUCCESS: {
                const {data} = action.payload;

                return fromActions.Actions.updateInvoiceItemsDataAfterDeleteRequest(data)
            }

            default:
                return null;
        }

    })
);

const submitInvoiceFormsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_ADD_FORM,
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_CHANGE_FORM,
        fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE_FORM,
    ),
    map((action) => {

        switch (action.type) {
            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_ADD_FORM: {
                const {data, invoice_id} = action.payload;

                return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(data, invoice_id)
            }

            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_CHANGE_FORM: {
                const {data, id, invoice_id} = action.payload;

                return invoiceItemsRequestAC.invoiceItemsPut.Actions.invoiceItemsPut(data, id, invoice_id)
            }

            case fromActions.ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE_FORM: {
                const {id, invoice_id} = action.payload;

                return invoiceItemsRequestAC.invoiceItemsDelete.Actions.invoiceItemsDelete(id, invoice_id)
            }

            default:
                return null;
        }
    })
);

export const invoiceItemsEpics = [
    loadAllInvoiceItemsEpic,
    updateInvoiceItemsDataEpic,
    submitInvoiceFormsEpic,
];