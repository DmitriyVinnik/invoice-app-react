import * as fromActions from '../AC';
import {initialState} from '../states';
import {RequestNestedState} from  '../../../states'

export function reducer(state = initialState, action: fromActions.Actions): RequestNestedState {

    switch (action.type) {
        case fromActions.ActionTypes.INVOICES_DELETE: {
            return {
                loading: true,
                loaded: false,
                errors: null,
                data: null,
            };
        }

        case fromActions.ActionTypes.INVOICES_DELETE_SUCCESS: {
            const {payload} = action;

            return {
                ...state,
                loading: false,
                loaded: true,
                data: payload.data,
            };
        }

        case fromActions.ActionTypes.INVOICES_DELETE_FAIL: {
            const {payload} = action;

            return {
                ...state,
                loading: false,
                errors: payload.errors,
            };
        }

        default:
            return state;
    }
}