export const actionTypes = {
    TOAST_SHOW: 'TOAST_SHOW',
    TOAST_HIDE: 'TOAST_HIDE',
};

export function showToast(message, error) {
    return {
        type: actionTypes.TOAST_SHOW,
        payload: {
            message,
            error,
        }
    }
}

export function hideToast() {
    return {
        type: actionTypes.TOAST_HIDE,
    }
}
