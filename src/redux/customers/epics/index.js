import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {
    actionTypes, setCustomersData, updateCustomersDataAfterPostRequest,
    updateCustomersDataAfterPutRequest, updateCustomersDataAfterDeleteRequest,
} from '../AC';
import {customersRequestAC} from '../../request/nested-states/customers/AC/index';

const loadAllCustomersEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_LOAD_ALL),
    map(() => customersRequestAC.customersGet.customersGet())
);

const setCustomersDataEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersGet.actionTypes.CUSTOMERS_GET_SUCCESS),
    map((action) => setCustomersData(action.payload.data))
);

const updateCustomersDataAfterPostRequestEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersPost.actionTypes.CUSTOMERS_POST_SUCCESS),
    map(action => updateCustomersDataAfterPostRequest(action.payload.data))
);

const updateCustomersDataAfterPutRequestEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersPut.actionTypes.CUSTOMERS_PUT_SUCCESS),
    map(action => updateCustomersDataAfterPutRequest(action.payload.data))
);

const updateCustomersDataAfterDeleteRequestEpic = action$ => action$.pipe(
    ofType(customersRequestAC.customersDelete.actionTypes.CUSTOMERS_DELETE_SUCCESS),
    map(action => updateCustomersDataAfterDeleteRequest(action.payload.data))
);

const submitCustomerAddFormEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_SUBMIT_ADD_FORM),
    map((action) => customersRequestAC.customersPost.customersPost(action.payload.data))
);

const submitCustomerChangeFormEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_SUBMIT_CHANGE_FORM),
    map((action) => customersRequestAC.customersPut.customersPut(action.payload.data, action.payload.id))
);

const submitCustomerDeleteFormEpic = action$ => action$.pipe(
    ofType(actionTypes.CUSTOMERS_SUBMIT_DELETE_FORM),
    map((action) => customersRequestAC.customersDelete.customerDelete(action.payload.id))
);

export const customersEpics = [
    loadAllCustomersEpic,
    setCustomersDataEpic,
    updateCustomersDataAfterPostRequestEpic,
    updateCustomersDataAfterPutRequestEpic,
    updateCustomersDataAfterDeleteRequestEpic,
    submitCustomerAddFormEpic,
    submitCustomerChangeFormEpic,
    submitCustomerDeleteFormEpic,
];