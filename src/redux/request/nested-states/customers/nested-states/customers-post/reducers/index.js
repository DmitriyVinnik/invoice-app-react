import { actionTypes } from '../AC';
import { initialState } from '../states';


export function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case actionTypes.CUSTOMERS_POST:
            return {
                loading: true,
                loaded: false,
                errors: null,
                data: null,
            };

        case actionTypes.CUSTOMERS_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload.data,
            };


        case actionTypes.CUSTOMERS_POST_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload.errors,
            };

        default:
            return state;
    }
}