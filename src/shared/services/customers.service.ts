import {ajax, AjaxResponse} from 'rxjs/ajax';
import {Observable} from 'rxjs';
import {RequestPayload} from '../../redux/request/nested-states/customers/AC';

const CUSTOMERS_URL = 'http://localhost:8000/api/customers/';

class CustomersService {

    public postCustomer(payload: RequestPayload): Observable<AjaxResponse> {
        return ajax.post(
            CUSTOMERS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public getCustomer(): Observable<AjaxResponse> {
        return ajax.get(CUSTOMERS_URL)
    }

    public putCustomer(payload: RequestPayload): Observable<AjaxResponse> {
        return ajax.put(
            CUSTOMERS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    public deleteCustomer(payload: RequestPayload): Observable<AjaxResponse> {
        return ajax.delete(CUSTOMERS_URL + payload.id)
    }
}

export default new CustomersService();
