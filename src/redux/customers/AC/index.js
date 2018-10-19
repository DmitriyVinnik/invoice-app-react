import {
    LOAD_ALL_CUSTOMERS, LOAD_ALL_CUSTOMERS_SUCCESS, LOAD_ALL_CUSTOMERS_FAIL, ACTIVE_CUSTOMER,
    RESET_ACTIVE_CUSTOMER, TOGGLE_CUSTOMER_ADD_FORM, POST_CUSTOMER_ADD_FORM, POST_CUSTOMER_ADD_FORM_SUCCESS,
    POST_CUSTOMER_ADD_FORM_FAIL, TOGGLE_CUSTOMER_CHANGE_FORM, PUT_CUSTOMER_CHANGE_FORM,
    PUT_CUSTOMER_CHANGE_FORM_SUCCESS, PUT_CUSTOMER_CHANGE_FORM_FAIL, TOGGLE_CUSTOMER_DELETE_FORM,
    DELETE_CUSTOMER, DELETE_CUSTOMER_FAIL, DELETE_CUSTOMER_SUCCESS,
} from '../../../constants';

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

export function activeCustomer(id, data) {
    return {
        type: ACTIVE_CUSTOMER,
        payload: id,
        data
    }
}

export function resetActiveCustomer() {
    return {
        type: RESET_ACTIVE_CUSTOMER,
    }
}

export function toggleCustomerAddForm() {
    return {
        type: TOGGLE_CUSTOMER_ADD_FORM,
    }
}

export function postCustomerAddForm(data) {
    return {
        type: POST_CUSTOMER_ADD_FORM,
        payload: data,
    };
}

export function postCustomerAddFormSuccess(response) {
    console.log(response)
    return {
        type: POST_CUSTOMER_ADD_FORM_SUCCESS,
        payload: response,
    };
}

export function postCustomerAddFormFail(error) {
    return {
        type: POST_CUSTOMER_ADD_FORM_FAIL,
        payload: error,
    };
}

export function toggleCustomerChangeForm() {
    return {
        type: TOGGLE_CUSTOMER_CHANGE_FORM,
    }
}

export function putCustomerChangeForm(data, id) {
    return {
        type: PUT_CUSTOMER_CHANGE_FORM,
        payload: data,
        id,
    };
}

export function putCustomerChangeFormSuccess(response) {
    return {
        type: PUT_CUSTOMER_CHANGE_FORM_SUCCESS,
        payload: response,
    };
}

export function putCustomerChangeFormFail(error) {
    return {
        type: PUT_CUSTOMER_CHANGE_FORM_FAIL,
        payload: error,
    };
}

export function toggleCustomerDeleteForm() {
    return {
        type: TOGGLE_CUSTOMER_DELETE_FORM,
    }
}

export function deleteCustomer(id) {
    return {
        type: DELETE_CUSTOMER,
        payload: id,
    };
}

export function deleteCustomerSuccess(response) {
    return {
        type: DELETE_CUSTOMER_SUCCESS,
        payload: response,
    };
}

export function deleteCustomerFail(error) {
    return {
        type: DELETE_CUSTOMER_FAIL,
        payload: error,
    };
}