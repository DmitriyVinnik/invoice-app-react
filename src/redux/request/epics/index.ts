import {customersEpic} from '../nested-states/customers/epics';
import {productsEpic} from '../nested-states/products/epics';
import {invoicesEpic} from '../nested-states/invoices/epics';

export const requestEpics = [
    ...customersEpic,
    ...productsEpic,
    ...invoicesEpic,
];