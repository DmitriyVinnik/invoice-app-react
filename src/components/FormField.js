import React from 'react';
import PropTypes from 'prop-types';

export default function FormField(props) {
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
}

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
};
