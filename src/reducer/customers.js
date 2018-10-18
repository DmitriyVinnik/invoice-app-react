import {
    LOAD_ALL_CUSTOMERS, LOAD_ALL_CUSTOMERS_SUCCESS, LOAD_ALL_CUSTOMERS_FAIL, ACTIVE_CUSTOMER,
    RESET_ACTIVE_CUSTOMER, TOGGLE_CUSTOMER_ADD_FORM, POST_CUSTOMER_ADD_FORM, POST_CUSTOMER_ADD_FORM_FAIL,
    POST_CUSTOMER_ADD_FORM_SUCCESS, TOGGLE_CUSTOMER_CHANGE_FORM, PUT_CUSTOMER_CHANGE_FORM,
    PUT_CUSTOMER_CHANGE_FORM_SUCCESS, PUT_CUSTOMER_CHANGE_FORM_FAIL, TOGGLE_CUSTOMER_DELETE_FORM,
    DELETE_CUSTOMER, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL,
} from '../constants';

const defaultCustomersState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    errorLoadMessage: '',
    activeCustomerId: null,
    customerAddForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },
    customerChangeForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },
    customerDeleteForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },

};

export default (state = defaultCustomersState, action) => {
    const {type, payload} = action;
    
    switch (type) {

        case LOAD_ALL_CUSTOMERS: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case LOAD_ALL_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                data: payload,
                isLoaded: true,
                isLoading: false,
            };
        }

        case LOAD_ALL_CUSTOMERS_FAIL: {
            return {
                ...state,
                errorLoadMessage: payload,
            };
        }

        case ACTIVE_CUSTOMER: {
            return {
                ...state,
                activeCustomerId: payload,
            };
        }

        case RESET_ACTIVE_CUSTOMER: {
            return {
                ...state,
                activeCustomerId: null,
            };
        }

        case TOGGLE_CUSTOMER_ADD_FORM: {
            return {
                ...state,
                customerAddForm: {
                    ...state.customerAddForm,
                    isVisible: !state.customerAddForm.isVisible,
                },
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isVisible: false,
                },
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isVisible: false,
                },
            };
        }

        case POST_CUSTOMER_ADD_FORM: {
            return {
                ...state,
                customerAddForm: {
                    ...state.customerAddForm,
                    isLoading: true,
                },
            };
        }

        case POST_CUSTOMER_ADD_FORM_SUCCESS: {
            return {
                ...state,
                data: state.data.concat([payload]),
                customerAddForm: {
                    ...state.customerAddForm,
                    isLoading: false,
                    isVisible: false,
                },
            };
        }

        case POST_CUSTOMER_ADD_FORM_FAIL: {
            return {
                ...state,
                customerAddForm: {
                    ...state.customerAddForm,
                    isLoading: false,
                    errorMessage: payload,
                },
            };
        }

        case TOGGLE_CUSTOMER_CHANGE_FORM: {
            return {
                ...state,
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isVisible: !state.customerChangeForm.isVisible,
                },
                customerAddForm: {
                    ...state.customerAddForm,
                    isVisible: false,
                },
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isVisible: false,
                },
            };
        }

        case PUT_CUSTOMER_CHANGE_FORM: {
            return {
                ...state,
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isLoading: true,
                },
            };
        }

        case PUT_CUSTOMER_CHANGE_FORM_SUCCESS: {
            const index = state.data.findIndex(elem => elem.id === action.payload.id);
            const newState = [].concat(state.data);
            newState.splice(index, 1, payload);

            return {
                ...state,
                data: newState,
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isLoading: false,
                    isVisible: false,
                },
            };
        }

        case PUT_CUSTOMER_CHANGE_FORM_FAIL: {
            return {
                ...state,
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isLoading: false,
                    errorMessage: payload,
                },
            };
        }

        case TOGGLE_CUSTOMER_DELETE_FORM: {
            return {
                ...state,
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isVisible: !state.customerDeleteForm.isVisible,
                },
                customerChangeForm: {
                    ...state.customerChangeForm,
                    isVisible: false,
                },
                customerAddForm: {
                    ...state.customerAddForm,
                    isVisible: false,
                },
            };
        }

        case DELETE_CUSTOMER: {
            return {
                ...state,
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isLoading: true,
                },
            };
        }

        case DELETE_CUSTOMER_SUCCESS: {
            return {
                ...state,
                data: state.data.filter(elem => elem.id !== payload.id),
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isLoading: false,
                    isVisible: false,
                },
            };
        }

        case DELETE_CUSTOMER_FAIL: {
            return {
                ...state,
                customerDeleteForm: {
                    ...state.customerDeleteForm,
                    isLoading: false,
                    errorMessage: payload,
                },
            };
        }

        default:
            return state;
    }
}