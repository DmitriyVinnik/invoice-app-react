import { actionTypes } from '../AC';
import { initialState } from '../states';


export function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case actionTypes.CUSTOMERS_PUT:
            return {
                loading: true,
                loaded: false,
                errors: null,
                data: null,
            };

        case actionTypes.CUSTOMERS_PUT_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload.data,
            };


        case actionTypes.CUSTOMERS_PUT_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload.errors,
            };

        default:
            return state;
    }
}