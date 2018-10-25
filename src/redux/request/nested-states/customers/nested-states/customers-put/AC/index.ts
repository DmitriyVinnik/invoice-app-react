import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction'
import {Customer} from '../../../AC'

export enum ActionTypes {
    CUSTOMERS_PUT = 'CUSTOMERS_PUT',
    CUSTOMERS_PUT_SUCCESS = 'CUSTOMERS_PUT_SUCCESS',
    CUSTOMERS_PUT_FAIL = 'CUSTOMERS_PUT_FAIL',
}

export const Actions = {
    customersPut: (data: Customer[], id: number) => {
        return createAction(ActionTypes.CUSTOMERS_PUT, {data, id})
    },
    customersPutSuccess: (data: Customer) => {
        return createAction(ActionTypes.CUSTOMERS_PUT_SUCCESS, {data})
    },
    customersPutFail: (errors: string) => {
        return createAction(ActionTypes.CUSTOMERS_PUT_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
