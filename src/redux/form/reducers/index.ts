import {reducer, FormState} from 'redux-form';
import {customersRequestAC, RequestActionsSuccess} from '../../request/nested-states/customers/AC';
import * as customersAC from '../../customers/AC';
import {CustomerDataForServer, Customer} from '../../customers/states';

const formReducer = reducer.plugin({
    customerAdd: (state, action: RequestActionsSuccess): FormState | undefined => {
        const {type} = action;

        switch (type) {
            case customersRequestAC.customersPost.ActionTypes.CUSTOMERS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    customerChange: (state, action: customersAC.Actions): FormState | undefined => {

        switch (action.type) {

            case customersAC.ActionTypes.CUSTOMERS_RESET_SELECTION_ACTIVE:
                return undefined;

            case customersAC.ActionTypes.CUSTOMERS_SELECT_ACTIVE:
                const {payload} = action;
                const customer: Customer | undefined = payload.data.find(
                    (elem: Customer) => elem.id === payload.id
                );
                const emptyCustomer: CustomerDataForServer = {
                    name: '',
                    address: '',
                    phone: '',
                };
                const activeCustomer = !!customer ? customer : emptyCustomer;


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