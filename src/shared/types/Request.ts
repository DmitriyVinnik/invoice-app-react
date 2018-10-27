import {Observable} from "rxjs";
import {AjaxResponse} from "rxjs/ajax";
import {CustomerDataForServer} from "../../redux/customers/states";
import {ProductDataForServer} from "../../redux/products/states";

export interface RequestPayloadCustomers {
    data?: CustomerDataForServer,
    errors?: string,
    id?: number
}

export interface RequestPayloadProducts {
    data?: ProductDataForServer,
    errors?: string,
    id?: number
}

export interface RequestServiceCustomers {
    postCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
    getCustomer(payload?: RequestPayloadCustomers): Observable<AjaxResponse>;
    putCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
    deleteCustomer(payload: RequestPayloadCustomers): Observable<AjaxResponse>;
}

export interface RequestServiceProducts {
    postProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
    getProduct(payload?: RequestPayloadProducts): Observable<AjaxResponse>;
    putProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
    deleteProduct(payload: RequestPayloadProducts): Observable<AjaxResponse>;
}

