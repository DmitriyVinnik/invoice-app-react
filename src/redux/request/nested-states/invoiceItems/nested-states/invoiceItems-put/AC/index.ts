import {ActionsUnion} from '../../../../../../../shared/types/ActionsUnion';
import {createAction} from '../../../../../../../shared/helpers/createAction';
import {InvoiceItemDataForServer, InvoiceItem} from '../../../../../../invoiceItems/states';

export enum ActionTypes {
    INVOICE_ITEMS_PUT = 'INVOICE_ITEMS_PUT',
    INVOICE_ITEMS_PUT_SUCCESS = 'INVOICE_ITEMS_PUT_SUCCESS',
    INVOICE_ITEMS_PUT_FAIL = 'INVOICE_ITEMS_PUT_FAIL',
}

export const Actions = {
    invoiceItemsPut: (data: InvoiceItemDataForServer, id: number, invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT, {data, id, invoice_id})
    },
    invoiceItemsPutSuccess: (data: InvoiceItem) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT_SUCCESS, {data})
    },
    invoiceItemsPutFail: (errors: string) => {
        return createAction(ActionTypes.INVOICE_ITEMS_PUT_FAIL, {errors})
    },
};

export type Actions = ActionsUnion<typeof Actions>
