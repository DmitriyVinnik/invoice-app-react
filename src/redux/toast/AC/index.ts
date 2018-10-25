import {ActionsUnion} from '../../../shared/types/ActionsUnion';
import {createAction} from '../../../shared/helpers/createAction';

export interface ToastPayload {
    message?: string | null,
    error?: string | null,
}

export enum ActionTypes {
    TOAST_SHOW = 'TOAST_SHOW',
    TOAST_HIDE = 'TOAST_HIDE',
}

export const Actions = {
    showToast: ({message = null, error = null}: ToastPayload) => {
        return createAction(ActionTypes.TOAST_SHOW, {message, error})
    },
    hideToast: () => createAction(ActionTypes.TOAST_HIDE),
};

export type Actions = ActionsUnion<typeof Actions>
