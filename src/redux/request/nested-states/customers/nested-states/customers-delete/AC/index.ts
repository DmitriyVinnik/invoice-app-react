import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {RequestPayload} from '../../../AC';

export enum ActionTypes {
    CUSTOMERS_DELETE = 'CUSTOMERS_DELETE',
    CUSTOMERS_DELETE_SUCCESS = 'CUSTOMERS_DELETE_SUCCESS',
    CUSTOMERS_DELETE_FAIL = 'CUSTOMERS_DELETE_FAIL',
};

export const Actions = {
    customersDelete: ({id}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_DELETE, {id}),
    customersDetSuccess: ({data}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_DELETE_SUCCESS, {data}),
    customersDetFail: ({errors}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_DELETE_FAIL, {errors}),
};

export type Actions = ActionsUnion<typeof Actions>
