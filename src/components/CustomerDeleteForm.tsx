import React from 'react';

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    name: string | null,
    handleSubmit(evt: React.FormEvent<HTMLFormElement>): void,
}

type Props = OwnProps

const CustomerDeleteForm:React.SFC<Props> = (props: Props) => {
    const {name, isVisible, isLoading, errors, handleSubmit} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <h2>Delete customer</h2>
            <form onSubmit={handleSubmit}>
                {name && <p>You really want to delete the customer: {name}</p>}
                <div>
                    {errors && (<span>Error: {errors}</span>)}
                    <button
                        type='submit'
                        disabled={isLoading}
                    >
                        {name === null ? 'Close' : 'Delete'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerDeleteForm;