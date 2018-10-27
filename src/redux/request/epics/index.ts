import {customersEpic} from '../nested-states/customers/epics';
import {productsEpic} from '../nested-states/products/epics';

export const requestEpics = [
    ...customersEpic,
    ...productsEpic,
];