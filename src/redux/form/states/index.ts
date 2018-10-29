import {FormState} from 'redux-form';

export interface FormsState {
    customerAdd: FormState,
    customerChange: FormState,
    productAdd: FormsState,
    productChange: FormsState,
}