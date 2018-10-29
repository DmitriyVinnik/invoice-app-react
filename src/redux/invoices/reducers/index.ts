import _ from 'lodash-es';
import * as fromActions from '../AC';
import {initialState, InvoicesState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): InvoicesState {

    switch (action.type) {
        case fromActions.ActionTypes.INVOICES_SET_DATA: {
            const newData = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];

            return {
                ...state,
                data: _.unionBy(newData, state.data, 'id')
            };
        }

        case fromActions.ActionTypes.INVOICES_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (elem) => elem.id !== action.payload.data.id
                ),
                activeInvoiceId: null,
            };
        }

        case fromActions.ActionTypes.INVOICES_SELECT_ACTIVE: {
            return {
                ...state,
                activeInvoiceId: action.payload.id,
            };
        }

        case fromActions.ActionTypes.INVOICES_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeInvoiceId: null,
            };
        }

        default:
            return state;
    }
}