import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {RequestPayload} from '../../../AC';

export enum ActionTypes {
    CUSTOMERS_GET = 'CUSTOMERS_GET',
    CUSTOMERS_GET_SUCCESS = 'CUSTOMERS_GET_SUCCESS',
    CUSTOMERS_GET_FAIL = 'CUSTOMERS_GET_FAIL',
}

export const Actions = {
    customersGet: () => createAction(ActionTypes.CUSTOMERS_GET),
    customersGetSuccess: ({data}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_GET_SUCCESS, {data}),
    customersGetFail: ({errors}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_GET_FAIL, {errors}),
};

export type Actions = ActionsUnion<typeof Actions>
