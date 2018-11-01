import {forkJoin, Observable} from 'rxjs'
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {InvoiceItemDataForServer} from "../../redux/invoiceItems/states";

const INVOICES_URL = 'http://localhost:8000/api/invoices/';

interface GetPayload {
    invoice_id: number,
}

interface PostPayload extends GetPayload{
    data: InvoiceItemDataForServer[],
}

interface PutPayload extends PostPayload {
    id: number[],
}

interface DeletePayload extends GetPayload {
    id: number[],
}

interface RequestServiceInvoiceItems {
    postInvoiceItem(payload: PostPayload): Observable<AjaxResponse[]>;
    getInvoiceItem(payload?: GetPayload): Observable<AjaxResponse>;
    putInvoiceItem(payload: PutPayload): Observable<AjaxResponse>;
    deleteInvoiceItem(payload: DeletePayload): Observable<AjaxResponse>;
}

class InvoiceItemsService implements RequestServiceInvoiceItems {

    public postInvoiceItem(payload: PostPayload) {
        const {data, invoice_id} = payload;
        const arrayObservable = data.map<Observable<AjaxResponse>>((elem) => {
            return ajax.post(
                INVOICES_URL + invoice_id + '/items/',
                JSON.stringify(elem),
                {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            )
        });

        return forkJoin(arrayObservable);
    }

    public getInvoiceItem(payload: GetPayload) {
        return ajax.get(INVOICES_URL + payload.invoice_id + '/items/')
    }

    public putInvoiceItem(payload: PutPayload) {
        return ajax.put(
            INVOICES_URL + payload.invoice_id + '/items/' + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteInvoiceItem(payload: DeletePayload) {
        return ajax.delete(INVOICES_URL + payload.invoice_id + '/items/' + payload.id)
    }
}

export default new InvoiceItemsService();
