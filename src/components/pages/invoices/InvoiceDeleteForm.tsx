import React from 'react';

export interface OwnProps {
    isVisible: boolean,
    isLoading: boolean,
    errors: string | null,
    id: number | null,
    handleSubmit(evt: React.FormEvent<HTMLFormElement>): void,
}

type Props = OwnProps

const InvoiceDeleteForm:React.SFC<Props> = (props: Props) => {
    const {id, isVisible, isLoading, errors, handleSubmit} = props;

    return (
        <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
            <h2>Delete invoice</h2>
            <form onSubmit={handleSubmit}>
                {id && <p>You really want to delete the invoice - ID: {id}</p>}
                <div>
                    {errors && (<span>Error: {errors}</span>)}
                    <button
                        type='submit'
                        disabled={isLoading}
                    >
                        {id === null ? 'Close' : 'Delete'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceDeleteForm;
