import {Action} from 'redux';
import {AjaxError} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import InvoiceItemsService from '../../../../../../../shared/services/invoiceItems.service';
import * as fromActions from '../AC';

export const invoiceItemsPutEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.INVOICE_ITEMS_PUT),
    switchMap((action: fromActions.Actions): Observable<fromActions.Actions> =>
        InvoiceItemsService.putInvoiceItem(action.payload).pipe(
            map(ajaxResponse => {
                return fromActions.Actions.invoiceItemsPutSuccess(ajaxResponse.response)
            }),
            catchError((ajaxError: AjaxError) => {
                return of(fromActions.Actions.invoiceItemsPutFail(ajaxError.response))
            })
        )
    )
);