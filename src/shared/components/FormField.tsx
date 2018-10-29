import React from 'react';
import {WrappedFieldProps} from 'redux-form';

export interface OwnProps {
    id: string,
    labelText: string,
    placeholder?: string,
    type: string,
    step?: string,
    disabled?: boolean,
}

type Props = OwnProps & WrappedFieldProps;

export const FormField:React.SFC<Props> = (props: Props) => {
    const {id, placeholder, step, input, labelText, type, disabled, meta: {touched, error}} = props;

    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input
                {...input}
                type={type}
                step={step}
                id={id}
                placeholder={placeholder}
                disabled={disabled}
            />
            {touched && (error && <span>{error}</span>)}
        </div>
    );
};

export default FormField;