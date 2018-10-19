export const actionTypes = {
    CUSTOMERS_PUT: 'CUSTOMERS_PUT',
    CUSTOMERS_PUT_SUCCESS: 'CUSTOMERS_PUT_SUCCESS',
    CUSTOMERS_PUT_FAIL: 'CUSTOMERS_PUT_FAIL',
};

export function customersPut(data, id) {
    return {
        type: actionTypes.CUSTOMERS_PUT,
        payload: {
            data,
            id,
        },
    };
}

export function customerPutSuccess(data) {
    return {
        type: actionTypes.CUSTOMERS_PUT_SUCCESS,
        payload: {data},
    };
}

export function customerPutFail(errors) {
    return {
        type: actionTypes.CUSTOMERS_PUT_FAIL,
        payload: {errors},
    };
}
