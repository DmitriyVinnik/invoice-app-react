import {reducer, FormState} from 'redux-form';
import {customersRequestAC, RequestActionsSuccess} from '../../request/nested-states/customers/AC';
import * as customersAC from '../../customers/AC';
import {Customer} from '../../customers/states';

const formReducer = reducer.plugin({
    customerAdd: (state, action: RequestActionsSuccess): FormState => {
        const {type} = action;

        switch (type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS:
                return {
                    ...state,
                    values: undefined
                };

            default:
                return state;
        }
    },

    customerChange: (state, action: customersAC.Actions): FormState => {

        switch (action.type) {

            case customersAC.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE:
                return {
                    ...state,
                    values: undefined,
                };

            case customersAC.ActionTypes.CUSTOMERS_SELECT_ACTIVE:
                const {payload} = action;
                const customer = payload.data.find((customer) => customer.id === payload.id);
                const emptyCustomer: Customer = {
                    name: '',
                    address: '',
                    phone: '',
                };
                const activeCustomer: Customer = !!customer ? customer : emptyCustomer;


                return {
                    ...state,
                    values: {
                        ...state.values,
                        name:  activeCustomer.name,
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