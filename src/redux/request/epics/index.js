import { customersEpic } from '../nested-states/customers/epics';

export const requestEpics = [
  ...customersEpic,
];