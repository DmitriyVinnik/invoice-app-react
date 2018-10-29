import {ajax} from 'rxjs/ajax';
import {RequestPayloadInvoices, RequestServiceInvoices} from '../types/Request'

const PRODUCTS_URL = 'http://localhost:8000/api/invoices/';

class InvoicesService implements RequestServiceInvoices {

    public postInvoice(payload: RequestPayloadInvoices) {
        return ajax.post(
            PRODUCTS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getInvoice() {
        return ajax.get(PRODUCTS_URL)
    }

    public putInvoice(payload: RequestPayloadInvoices) {
        return ajax.put(
            PRODUCTS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteInvoice(payload: RequestPayloadInvoices) {
        return ajax.delete(PRODUCTS_URL + payload.id)
    }
}

export default new InvoicesService();
