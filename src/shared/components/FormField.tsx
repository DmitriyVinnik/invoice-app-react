import React from 'react';
import {WrappedFieldProps} from 'redux-form';

export interface OwnProps {
    id: string,
    labelText: string,
    placeholder?: string,
    type: string,
    step?: string,
    disabled?: boolean,
    min?: string,
}

type Props = OwnProps & WrappedFieldProps;

export const FormField:React.SFC<Props> = (props: Props) => {
    const {id, placeholder, step, min, input, labelText, type, disabled, meta: {touched, error}} = props;

    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input
                {...input}
                type={type}
                step={step}
                min={min}
                id={id}
                placeholder={placeholder}
                disabled={disabled}
            />
            {touched && (error && <span>{error}</span>)}
        </div>
    );
};

export default FormField;