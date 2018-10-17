import {LOAD_ALL_CUSTOMERS, START, SUCCESS, FAIL, ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER} from '../constants';

const defaultCustomersState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    errorLoadMessage: '',
    activeCustomerId: null,
};

export default (state = defaultCustomersState, action) => {
    const {type, payload} = action;
    
    switch (type) {

        case LOAD_ALL_CUSTOMERS + START: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case LOAD_ALL_CUSTOMERS + SUCCESS: {
            return {
                ...state,
                data: payload,
                isLoaded: true,
                isLoading: false,
            };
        }

        case LOAD_ALL_CUSTOMERS + FAIL: {
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

        default:
            return state;
    }
}