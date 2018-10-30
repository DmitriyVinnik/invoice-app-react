import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';
import {InvoiceItem, InvoiceItemDataForServer} from '../states';

export enum ActionTypes {
    INVOICE_ITEMS_LOAD_ALL = 'INVOICE_ITEMS_LOAD_ALL',
    INVOICE_ITEMS_SET_DATA = 'INVOICE_ITEMS_SET_DATA',
    INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST = 'INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST',
    INVOICE_ITEMS_SUBMIT_ADD_FORM = 'INVOICE_ITEMS_SUBMIT_ADD_FORM',
    INVOICE_ITEMS_SUBMIT_CHANGE_FORM = 'INVOICE_ITEMS_SUBMIT_CHANGE_FORM',
    INVOICE_ITEMS_SUBMIT_DELETE_FORM = 'INVOICE_ITEMS_SUBMIT_DELETE_FORM',
    INVOICE_ITEMS_SELECT_ACTIVE = 'INVOICE_ITEMS_SELECT_ACTIVE',
    INVOICE_ITEMS_RESET_SELECTION_ACTIVE = 'INVOICE_ITEMS_RESET_SELECTION_ACTIVE',
}

export const Actions = {
    setInvoiceItemsData: (data: InvoiceItem[] | InvoiceItem) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SET_DATA, {data})
    },
    updateInvoiceItemsDataAfterDeleteRequest: (data: InvoiceItem) => {
        return createAction(ActionTypes.INVOICE_ITEMS_UPDATE_DATA_AFTER_DELETE_REQUEST, {data})
    },
    loadAllInvoiceItems: (invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_LOAD_ALL, {invoice_id})
    },
    selectInvoiceItem: (id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SELECT_ACTIVE, {id})
    },
    resetSelectionInvoiceItem: () => {
        return createAction(ActionTypes.INVOICE_ITEMS_RESET_SELECTION_ACTIVE)
    },
    submitInvoiceItemAddForm: (data: InvoiceItemDataForServer, invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_ADD_FORM, {data, invoice_id})
    },
    submitInvoiceItemChangeForm: (data: InvoiceItemDataForServer, id: number, invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_CHANGE_FORM, {data, id, invoice_id})
    },
    submitInvoiceItemDeleteForm: (id: number, invoice_id: number) => {
        return createAction(ActionTypes.INVOICE_ITEMS_SUBMIT_DELETE_FORM, {id, invoice_id})
    },
};

export const onlyLoadAction = {
    load: Actions.loadAllInvoiceItems,
};

export type Actions = ActionsUnion<typeof Actions>
export type LoadAction = ActionsUnion<typeof onlyLoadAction>
