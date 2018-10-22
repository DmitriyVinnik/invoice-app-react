export const actionTypes = {
    CUSTOMERS_DELETE: 'CUSTOMERS_DELETE',
    CUSTOMERS_DELETE_SUCCESS: 'CUSTOMERS_DELETE_SUCCESS',
    CUSTOMERS_DELETE_FAIL: 'CUSTOMERS_DELETE_FAIL',
};

export function customerDelete(id) {
    return {
        type: actionTypes.CUSTOMERS_DELETE,
        payload: {id},
    };
}

export function customerDeleteSuccess(data) {
    return {
        type: actionTypes.CUSTOMERS_DELETE_SUCCESS,
        payload: {data},
    };
}

export function customerDeleteFail(errors) {
    return {
        type: actionTypes.CUSTOMERS_DELETE_FAIL,
        payload: {errors},
    };
}