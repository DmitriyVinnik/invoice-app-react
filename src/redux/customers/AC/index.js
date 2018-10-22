export const actionTypes = {
    CUSTOMERS_LOAD_ALL: 'CUSTOMERS_LOAD_ALL',
    CUSTOMERS_SET_DATA: 'CUSTOMERS_SET_DATA',
    CUSTOMERS_UPDATE_DATA_AFTER_POST_REQUEST: 'CUSTOMERS_UPDATE_DATA_AFTER_POST_REQUEST',
    CUSTOMERS_UPDATE_DATA_AFTER_PUT_REQUEST: 'CUSTOMERS_UPDATE_DATA_AFTER_PUT_REQUEST',
    CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST: 'CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST',
    CUSTOMERS_SUBMIT_ADD_FORM: 'CUSTOMERS_SUBMIT_ADD_FORM',
    CUSTOMERS_SUBMIT_CHANGE_FORM: 'CUSTOMERS_SUBMIT_CHANGE_FORM',
    CUSTOMERS_SUBMIT_DELETE_FORM: 'CUSTOMERS_SUBMIT_DELETE_FORM',
    CUSTOMERS_TOGGLE_CHANGE_FORM: 'CUSTOMERS_TOGGLE_CHANGE_FORM',
    CUSTOMERS_TOGGLE_ADD_FORM: 'CUSTOMERS_TOGGLE_ADD_FORM',
    CUSTOMERS_TOGGLE_DELETE_FORM: 'CUSTOMERS_TOGGLE_DELETE_FORM',
    CUSTOMERS_SELECT_ACTIVE: 'CUSTOMERS_SELECT_ACTIVE',
    CUSTOMERS_RESET_SELECTION_ACTIVE: 'CUSTOMERS_RESET_SELECTION_ACTIVE',
};

export function setCustomersData(data) {
    return {
        type: actionTypes.CUSTOMERS_SET_DATA,
        payload: {data},
    }
}

export function updateCustomersDataAfterPostRequest(data) {
    return {
        type: actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_POST_REQUEST,
        payload: {data},
    }
}

export function updateCustomersDataAfterPutRequest(data) {
    return {
        type: actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_PUT_REQUEST,
        payload: {data},
    }
}

export function updateCustomersDataAfterDeleteRequest(data) {
    return {
        type: actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST,
        payload: {data},
    }
}

export function loadAllCustomers() {
    return {
        type: actionTypes.CUSTOMERS_LOAD_ALL,
    };
}

export function selectCustomer(data, id) {
    return {
        type: actionTypes.CUSTOMERS_SELECT_ACTIVE,
        payload: {
            data,
            id,
        }
    }
}

export function resetSelectionCustomer() {
    return {
        type: actionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE,
    }
}

export function toggleCustomerAddForm() {
    return {
        type: actionTypes.CUSTOMERS_TOGGLE_ADD_FORM,
    }
}

export function submitCustomerAddForm(data) {
    return {
        type: actionTypes.CUSTOMERS_SUBMIT_ADD_FORM,
        payload: {data},
    };
}

export function toggleCustomerChangeForm() {
    return {
        type: actionTypes.CUSTOMERS_TOGGLE_CHANGE_FORM,
    }
}

export function submitCustomerChangeForm(data, id) {
    return {
        type: actionTypes.CUSTOMERS_SUBMIT_CHANGE_FORM,
        payload: {
            data,
            id,
        }
    };
}

export function toggleCustomerDeleteForm() {
    return {
        type: actionTypes.CUSTOMERS_TOGGLE_DELETE_FORM,
    }
}

export function submitCustomerDeleteForm(id) {
    return {
        type: actionTypes.CUSTOMERS_SUBMIT_DELETE_FORM,
        payload: {id},
    };
}