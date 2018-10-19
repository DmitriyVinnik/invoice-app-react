export const actionTypes = {
    CUSTOMERS_POST: 'CUSTOMERS_POST',
    CUSTOMERS_POST_SUCCESS: 'CUSTOMERS_POST_SUCCESS',
    CUSTOMERS_POST_FAIL: 'CUSTOMERS_POST_FAIL',
};

export function customersPost(data) {
    return {
        type: actionTypes.CUSTOMERS_POST,
        payload: {data},
    };
}

export function customersPostSuccess(data) {
    return {
        type: actionTypes.CUSTOMERS_POST_SUCCESS,
        payload: {data},
    };
}

export function customersPostFail(errors) {
    return {
        type: actionTypes.CUSTOMERS_POST_FAIL,
        payload: {errors},
    };
}
