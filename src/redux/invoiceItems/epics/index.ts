import {Action} from 'redux';
import {Observable} from 'rxjs';
import {ofType, StateObservable} from 'redux-observable';
import {map} from 'rxjs/operators';
import * as fromActions from '../AC';
import {invoiceItemsRequestAC, RequestActionsSuccess} from '../../request/nested-states/invoiceItems/AC';
import {
    invoicesRequestAC, PostSuccess as RequestInvoicePostSuccess /*RequestActionsSuccess as
     RequestInvoiceActionsSuccess*/
} from '../../request/nested-states/invoices/AC';
import {RootState} from "../../store";
import {InvoiceItemDataForServer} from "../states";
// import {Invoice} from "../../invoices/states";

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

const afterSuccesPostInvoiceEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType<RequestInvoicePostSuccess>(invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS),
    map((action) => {
        const {id} = action.payload.data;

        let formData: InvoiceItemDataForServer[]  = [];
        let dataForServer: InvoiceItemDataForServer[] = [];
        if (state$.value.form.invoiceAdd.values) {
            formData = state$.value.form.invoiceAdd.values.invoiceItems;
            dataForServer = formData.map<InvoiceItemDataForServer>((elem) => {
                elem.invoice_id = id;

                return elem
            })
        }

        return invoiceItemsRequestAC.invoiceItemsPost.Actions.invoiceItemsPost(dataForServer, id)
    })
);

export const invoiceItemsEpics = [
    loadAllInvoiceItemsEpic,
    updateInvoiceItemsDataEpic,
    afterSuccesPostInvoiceEpic,
];