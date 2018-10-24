import * as customersDelete from '../nested-states/customers-delete/AC/index';
import * as customersGet from '../nested-states/customers-get/AC/index';
import * as customersPost from '../nested-states/customers-post/AC/index';
import * as customersPut from '../nested-states/customers-put/AC/index';

export interface RequestPayload {
    data?: any,
    id?: number,
    errors?: string,
}

export const customersRequestAC = {
    customersDelete,
    customersGet,
    customersPost,
    customersPut,
};
