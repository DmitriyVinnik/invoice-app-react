import * as fromActions from '../AC';
import {initialState, CustomersState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): CustomersState {

    switch (action.type) {
        case fromActions.ActionTypes.CUSTOMERS_SET_DATA: {
            return {
                ...state,
                data: action.payload.data,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_UPDATE_DATA_AFTER_POST_REQUEST: {
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload.data,
                ],
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_UPDATE_DATA_AFTER_PUT_REQUEST: {
            const newData = [...state.data];
            const changedCustomerIndex = state.data.findIndex(
                (elem) => elem.id === action.payload.data.id
            );
            newData.splice(changedCustomerIndex, 1, action.payload.data);

            return {
                ...state,
                data: newData,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (elem) => elem.id !== action.payload.data.id
                ),
                activeCustomerId: null,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_SELECT_ACTIVE: {
            return {
                ...state,
                activeCustomerId: action.payload.id,
            };
        }

        case fromActions.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeCustomerId: null,
            };
        }

        default:
            return state;
    }
}