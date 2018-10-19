import {ajax} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {switchMap, map, catchError} from  'rxjs/operators';
import {LOAD_ALL_CUSTOMERS, URL, POST_CUSTOMER_ADD_FORM, PUT_CUSTOMER_CHANGE_FORM, DELETE_CUSTOMER} from '../../../constants';
import {
    loadAllCustomersSuccess, loadAllCustomersFail, postCustomerAddFormSuccess,
    postCustomerAddFormFail, putCustomerChangeFormSuccess, putCustomerChangeFormFail, deleteCustomerSuccess, deleteCustomerFail,
} from '../AC/index'

export const loadAllCustomersEpic = action$ => action$.pipe(
    ofType(LOAD_ALL_CUSTOMERS),
    switchMap(() =>
        ajax.getJSON(URL.CUSTOMERS).pipe(
            map(response => loadAllCustomersSuccess(response)),
            catchError(error => loadAllCustomersFail(error))
        )
    )
);

export const postCustomerAddFormEpic = action$ => action$.pipe(
    ofType(POST_CUSTOMER_ADD_FORM),
    switchMap((action) => ajax.post(
        URL.CUSTOMERS,
        JSON.stringify(action.payload),
        {
            'Content-Type': 'application/json; charset=utf-8',
        })
        .pipe(
            map(AjaxResponse => postCustomerAddFormSuccess(AjaxResponse.response)),
            catchError(error => postCustomerAddFormFail(error))
        )
    )
);

export const putCustomerChangeFormEpic = action$ => action$.pipe(
    ofType(PUT_CUSTOMER_CHANGE_FORM),
    switchMap((action) => {
        return ajax.put(
                `${URL.CUSTOMERS}/${action.id}`,
                JSON.stringify(action.payload),
                {
                    'Content-Type': 'application/json; charset=utf-8',
                })
                .pipe(
                    map(AjaxResponse => putCustomerChangeFormSuccess(AjaxResponse.response)),
                    catchError(error => putCustomerChangeFormFail(error))
                )
        }
    )
);

export const deleteCustomerEpic = action$ => action$.pipe(
    ofType(DELETE_CUSTOMER),
    switchMap((action) => {
            return ajax.delete(`${URL.CUSTOMERS}/${action.payload}`)
                .pipe(
                    map(AjaxResponse => deleteCustomerSuccess(AjaxResponse.response)),
                    catchError(error => deleteCustomerFail(error))
                )
        }
    )
);