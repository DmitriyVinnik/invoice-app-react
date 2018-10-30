import {ajax} from 'rxjs/ajax';
import {RequestPayloadInvoiceItems, RequestServiceInvoiceItems} from '../types/Request';

const INVOICES_URL = 'http://localhost:8000/api/invoices/';

class InvoiceItemsService implements RequestServiceInvoiceItems {

    public postInvoiceItem(payload: RequestPayloadInvoiceItems) {
        return ajax.post(
            INVOICES_URL + payload.invoice_id + '/items/',
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getInvoiceItem(payload: RequestPayloadInvoiceItems) {
        return ajax.get(INVOICES_URL + payload.invoice_id + '/items/')
    }

    public putInvoiceItem(payload: RequestPayloadInvoiceItems) {
        return ajax.put(
            INVOICES_URL + payload.invoice_id + '/items/' + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteInvoiceItem(payload: RequestPayloadInvoiceItems) {
        return ajax.delete(INVOICES_URL + payload.invoice_id + '/items/' + payload.id)
    }
}

export default new InvoiceItemsService();
