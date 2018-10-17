import {LOAD_ALL_CUSTOMERS, START, SUCCESS, FAIL, ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER} from '../constants';

export function loadAllCustomersStart() {
    return {
        type: LOAD_ALL_CUSTOMERS + START,
    };
}

export function loadAllCustomersSuccess(response) {
    return {
        type: LOAD_ALL_CUSTOMERS + SUCCESS,
        payload: response,
    };
}

export function loadAllCustomersFail(error) {
    return {
        type: LOAD_ALL_CUSTOMERS + FAIL,
        payload: error,
    };
}

export function activeCustomer(id) {
    return {
        type: ACTIVE_CUSTOMER,
        payload: id,
    }
}

export function resetActiveCustomer() {
    return {
        type: RESET_ACTIVE_CUSTOMER,
    }
}