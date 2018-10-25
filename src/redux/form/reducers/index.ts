import {reducer} from 'redux-form';
import {customersRequestAC} from '../../request/nested-states/customers/AC';
import * as customersAC from '../../customers/AC';

const formReducer = reducer.plugin({
    customerAdd: (state, action) => {
        const {type} = action;

        switch (type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    customerChange: (state, action) => {
        const {type, payload} = action;

        switch (type) {

            case customersAC.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE:
                return undefined;

            case customersAC.ActionTypes.CUSTOMERS_SELECT_ACTIVE:
                const activeCustomer = payload.data.find((customer: any) => customer.id === payload.id);

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