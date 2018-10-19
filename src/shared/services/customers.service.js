import {ajax} from 'rxjs/ajax';

const CUSTOMERS_URL = 'http://localhost:8000/api/customers/';

class CustomersService {

    postCustomer(payload) {
        return ajax.post(
            CUSTOMERS_URL,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    getCustomer() {
        return ajax.getJSON(CUSTOMERS_URL)
    }

    putCustomer(payload) {
        return ajax.put(
            CUSTOMERS_URL + payload.id,
            JSON.stringify(payload.data),
            {
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }

    deleteCustomer(payload) {
        return ajax.delete(CUSTOMERS_URL + payload.id)
    }
}

export default new CustomersService();
