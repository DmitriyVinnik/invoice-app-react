import {reducer} from 'redux-form';
import {customersRequestAC} from '../../request/nested-states/customers/AC';
import * as customersAC from '../../customers/AC';

const formReducer = reducer.plugin({
    customerAdd: (state, action) => {
        const {type} = action;

        switch (type) {
            case customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    customerChange: (state, action) => {
        const {type, payload} = action;

        switch (type) {
            case customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS:
                return undefined;

            case customersAC.actionTypes.CUSTOMERS_SELECT_ACTIVE:
                const activeCustomer = payload.data.find(customer => customer.id === payload.id);

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

export default formReducer;