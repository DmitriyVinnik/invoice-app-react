import React from 'react';
import {WrappedFieldProps} from 'redux-form';

export interface OwnProps {
    id: string,
    labelText: string,
    placeholder?: string,
    type: string,
}

interface ReduxFormFieldProps extends WrappedFieldProps{
}

type Props = OwnProps & ReduxFormFieldProps;

export const FormField:React.SFC<Props> = (props: Props) => {
    const {id, placeholder, input, labelText, type, meta: {touched, error}} = props;

    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input
                {...input}
                type={type}
                id={id}
                placeholder={placeholder}
            />
            {touched && (error && <span>{error}</span>)}
        </div>
    );
};

export default FormField;