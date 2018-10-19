import { reducer } from 'redux-form';
import { POST_CUSTOMER_ADD_FORM_SUCCESS, PUT_CUSTOMER_CHANGE_FORM_SUCCESS,
 ACTIVE_CUSTOMER} from '../../../constants';

const form = reducer.plugin({
    customerAdd: (state, action) => {
        const {type} = action;

        switch (type) {
            case POST_CUSTOMER_ADD_FORM_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    customerChange: (state, action) => {
        const {type} = action;

        switch (type) {
            case PUT_CUSTOMER_CHANGE_FORM_SUCCESS:
                return undefined;

            case ACTIVE_CUSTOMER:
                const activeCustomer = action.data.find(customer => customer.id === action.payload)

                return {
                  ...state,
                  values: {
                    ...state.values,
                    name: activeCustomer.name,
                    address: activeCustomer.address,
                    phone: activeCustomer.phone,
                  }
                };

            default:
                return state;
        }
    },
});

export default form;