import {actionTypes} from '../AC';
import initialState from '../states';

export function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case actionTypes.TOAST_SHOW: {
            return {
                isOpen: true,
                message: payload.message,
                error: payload.error,
            };
        }

        case actionTypes.TOAST_HIDE: {
            return {
                isOpen: false,
                message: null,
                error: null,
            };
        }

        default:
            return state;
    }
}