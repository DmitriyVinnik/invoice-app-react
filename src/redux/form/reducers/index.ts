import {reducer, FormState} from 'redux-form';
import {
    customersRequestAC, RequestActionsSuccess as RequestCustomerActionsSuccess
} from '../../request/nested-states/customers/AC';
import {
    productsRequestAC, RequestActionsSuccess as RequestProductActionsSuccess
} from '../../request/nested-states/products/AC';
import {
    invoicesRequestAC, RequestActionsSuccess as RequestInvoiceActionsSuccess
} from '../../request/nested-states/invoices/AC';
import * as customersAC from '../../customers/AC';
import * as productsAC from '../../products/AC';
import * as invoicesAC from '../../invoices/AC';
import {CustomerDataForServer, Customer} from '../../customers/states';
import {ProductDataForServer, Product} from '../../products/states';
import {InvoiceDataForServer, Invoice} from '../../invoices/states';

const formReducer = reducer.plugin({
    customerAdd: (state, action: RequestCustomerActionsSuccess): FormState | undefined => {
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


                return state ?
                    {
                        ...state,
                        values: {
                            ...state.values,
                            name: activeCustomer.name,
                            address: activeCustomer.address,
                            phone: activeCustomer.phone,
                        }
                    } :
                    state;

            default:
                return state;
        }
    },

    productAdd: (state, action: RequestProductActionsSuccess): FormState | undefined => {
        const {type} = action;

        switch (type) {
            case productsRequestAC.productsPost.ActionTypes.PRODUCTS_POST_SUCCESS:
                return undefined;

            default:
                return state;
        }
    },

    productChange: (state, action: productsAC.Actions): FormState | undefined => {

        switch (action.type) {

            case productsAC.ActionTypes.PRODUCTS_RESET_SELECTION_ACTIVE:
                return undefined;

            case productsAC.ActionTypes.PRODUCTS_SELECT_ACTIVE:
                const {payload} = action;
                const product: Product | undefined = payload.data.find(
                    (elem: Product) => elem.id === payload.id
                );
                const emptyProduct: ProductDataForServer = {
                    name: '',
                    price: 0,
                };
                const activeProduct = !!product ? product : emptyProduct;


                return state ?
                    {
                        ...state,
                        values: {
                            ...state.values,
                            name: activeProduct.name,
                            price: activeProduct.price,
                        }
                    } :
                    state;

            default:
                return state;
        }
    },

    invoiceAdd: (state, action: RequestInvoiceActionsSuccess | invoicesAC.Actions): FormState | undefined => {

        switch (action.type) {
            case invoicesRequestAC.invoicesPost.ActionTypes.INVOICES_POST_SUCCESS:
                return undefined;

        //     case invoicesAC.ActionTypes.INVOICES_SELECT_ACTIVE:
        //         const {payload} = action;
        //         const invoice: Invoice | undefined = payload.data.find(
        //             (elem: Invoice) => elem.id === payload.id
        //         );
        //         const emptyInvoice: InvoiceDataForServer = {
        //             discount: 0,
        //             total: 0,
        //             customer_id: 0,
        //         };
        //         const activeInvoice = !!invoice ? invoice : emptyInvoice;
        //
        //         return state ?
        //             {
        //                 ...state,
        //                 values: {
        //                     ...state.values,
        //                     customer_id: activeInvoice.customer_id,
        //                 }
        //             } :
        //             state;
        //
            default:
                return state;
        }
    },

    invoiceChange: (state, action: invoicesAC.Actions): FormState | undefined => {

        switch (action.type) {

            case invoicesAC.ActionTypes.INVOICES_RESET_SELECTION_ACTIVE:
                return undefined;

            case invoicesAC.ActionTypes.INVOICES_SELECT_ACTIVE:
                const {payload} = action;
                const invoice: Invoice | undefined = payload.data.find(
                    (elem: Invoice) => elem.id === payload.id
                );
                const emptyInvoice: InvoiceDataForServer = {
                    discount: 0,
                    total: 0,
                    customer_id: 0,
                };
                const activeInvoice = !!invoice ? invoice : emptyInvoice;


                return state ?
                    {
                        ...state,
                        values: {
                            ...state.values,
                            discount: activeInvoice.discount,
                            total: activeInvoice.total,
                        }
                    } :
                    state;

            default:
                return state;
        }
    },
});

export default formReducer;