import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {RequestPayload} from '../../../AC';

export enum ActionTypes {
    CUSTOMERS_POST = 'CUSTOMERS_POST',
    CUSTOMERS_POST_SUCCESS = 'CUSTOMERS_POST_SUCCESS',
    CUSTOMERS_POST_FAIL = 'CUSTOMERS_POST_FAIL',
}

export const Actions = {
    customersPost: ({data}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_POST, {data}),
    customersPostSuccess: ({data}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_POST_SUCCESS, {data}),
    customersPostFail: ({errors}: RequestPayload) => createAction(ActionTypes.CUSTOMERS_POST_FAIL, {errors}),
};

export type Actions = ActionsUnion<typeof Actions>
