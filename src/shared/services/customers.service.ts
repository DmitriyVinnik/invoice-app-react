import {ajax} from 'rxjs/ajax';
import {RequestService, RequestPayload} from '../types/Request'

const CUSTOMERS_URL = 'http://localhost:8000/api/customers/';

class CustomersService implements RequestService {

    public postCustomer(payload: RequestPayload) {
        return ajax.post(
            CUSTOMERS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getCustomer() {
        return ajax.get(CUSTOMERS_URL)
    }

    public putCustomer(payload: RequestPayload) {
        return ajax.put(
            CUSTOMERS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteCustomer(payload: RequestPayload) {
        return ajax.delete(CUSTOMERS_URL + payload.id)
    }
}

export default new CustomersService();
