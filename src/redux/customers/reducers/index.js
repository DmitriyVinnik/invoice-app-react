import {actionTypes} from '../AC';
import initialState from '../states';

export function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case actionTypes.CUSTOMERS_SET_DATA: {
            return {
                ...state,
                data: payload.data,
            };
        }

        case actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_POST_REQUEST: {
            return {
                ...state,
                data: [
                    ...state.data,
                    payload.data,
                ],
            };
        }

        case actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_PUT_REQUEST: {
            const newData = [...state.data];
            const changedCustomerIndex = state.data.findIndex(elem => elem.id === action.payload.data.id);
            newData.splice(changedCustomerIndex, 1, action.payload.data);

            return {
                ...state,
                data: newData,
            };
        }

        case actionTypes.CUSTOMERS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(elem => elem.id !== action.payload.data.id),
                activeCustomerId: null,
            };
        }

        case actionTypes.CUSTOMERS_SELECT_ACTIVE: {
            return {
                ...state,
                activeCustomerId: payload.id,
            };
        }

        case actionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeCustomerId: null,
            };
        }

        default:
            return state;
    }
}