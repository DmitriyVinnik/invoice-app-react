import * as fromActions from '../AC';
import {initialState, ProductsState} from '../states';

export function reducer(state = initialState, action: fromActions.Actions): ProductsState {

    switch (action.type) {
        case fromActions.ActionTypes.PRODUCTS_SET_DATA: {
            return {
                ...state,
                data: action.payload.data,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_UPDATE_DATA_AFTER_POST_REQUEST: {
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload.data,
                ],
            };
        }

        case fromActions.ActionTypes.PRODUCTS_UPDATE_DATA_AFTER_PUT_REQUEST: {
            const newData = [...state.data];
            const changedProductIndex = state.data.findIndex(
                (elem) => elem.id === action.payload.data.id
            );
            newData.splice(changedProductIndex, 1, action.payload.data);

            return {
                ...state,
                data: newData,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_UPDATE_DATA_AFTER_DELETE_REQUEST: {
            return {
                ...state,
                data: state.data.filter(
                    (elem) => elem.id !== action.payload.data.id
                ),
                activeProductId: null,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_SELECT_ACTIVE: {
            return {
                ...state,
                activeProductId: action.payload.id,
            };
        }

        case fromActions.ActionTypes.PRODUCTS_RESET_SELECTION_ACTIVE: {
            return {
                ...state,
                activeProductId: null,
            };
        }

        default:
            return state;
    }
}