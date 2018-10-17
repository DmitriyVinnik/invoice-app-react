import {LOAD_ALL_CUSTOMERS, LOAD_ALL_CUSTOMERS_SUCCESS, LOAD_ALL_CUSTOMERS_FAIL, ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER} from '../constants';

export function loadAllCustomersStart() {
    return {
        type: LOAD_ALL_CUSTOMERS,
    };
}

export function loadAllCustomersSuccess(response) {
    return {
        type: LOAD_ALL_CUSTOMERS_SUCCESS,
        payload: response,
    };
}

export function loadAllCustomersFail(error) {
    return {
        type: LOAD_ALL_CUSTOMERS_FAIL,
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