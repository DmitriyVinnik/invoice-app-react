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
                isVisible: {
                    ...state.isVisible,
                    changeForm: false,
                    deleteForm: false,
                },
            };
        }

        case actionTypes.CUSTOMERS_TOGGLE_ADD_FORM: {
            return {
                ...state,
                isVisible: {
                    addForm: !state.isVisible.addForm,
                    changeForm: false,
                    deleteForm: false,
                },
            };
        }

        case actionTypes.CUSTOMERS_TOGGLE_CHANGE_FORM: {
            return {
                ...state,
                isVisible: {
                    addForm: false,
                    changeForm: !state.isVisible.changeForm,
                    deleteForm: false,
                },
            };
        }

        case actionTypes.CUSTOMERS_TOGGLE_DELETE_FORM: {
            return {
                ...state,
                isVisible: {
                    addForm: false,
                    changeForm: false,
                    deleteForm: !state.isVisible.deleteForm,
                },
            };
        }

        default:
            return state;
    }
}