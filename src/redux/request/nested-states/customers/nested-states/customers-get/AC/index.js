export const actionTypes = {
    CUSTOMERS_GET: 'CUSTOMERS_GET',
    CUSTOMERS_GET_SUCCESS: 'CUSTOMERS_GET_SUCCESS',
    CUSTOMERS_GET_FAIL: 'CUSTOMERS_GET_FAIL',
};

export function customersGet() {
    return {
        type: actionTypes.CUSTOMERS_GET,
    };
}

export function customersGetSuccess(data) {
    return {
        type: actionTypes.CUSTOMERS_GET_SUCCESS,
        payload: {data},
    };
}

export function customersGetFail(errors) {
    return {
        type: actionTypes.CUSTOMERS_GET_FAIL,
        payload: {errors},
    };
}
