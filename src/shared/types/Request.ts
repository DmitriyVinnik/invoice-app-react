import {Observable} from "rxjs";
import {AjaxResponse} from "rxjs/ajax";
import {CustomerDataForServer} from "../../redux/customers/states";

export interface RequestPayload {
    data?: CustomerDataForServer,
    errors?: string,
    id?: number
}

export interface RequestService {
    postCustomer(payload: RequestPayload): Observable<AjaxResponse>;
    getCustomer(payload?: RequestPayload): Observable<AjaxResponse>;
    putCustomer(payload: RequestPayload): Observable<AjaxResponse>;
    deleteCustomer(payload: RequestPayload): Observable<AjaxResponse>;
}

