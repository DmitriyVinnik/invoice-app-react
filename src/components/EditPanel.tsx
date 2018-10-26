import React from 'react';

export interface OwnProps {
    onAddButtonClick(): void,
    onChangeButtonClick(): void,
    onDeleteButtonClick(): void,
    activeId: number | null,
    formsState: {
        isVisibleAddForm: boolean,
        isVisibleChangeForm: boolean,
        isVisibleDeleteForm: boolean,
    }
}

const EditPanel:React.SFC<OwnProps> = (props: OwnProps) => {
    const {
        onAddButtonClick, onChangeButtonClick, onDeleteButtonClick, activeId, formsState,
    } = props;

    return (
        <div>
            <button
                type="button"
                onClick={onAddButtonClick}
            >
                {formsState.isVisibleAddForm ? 'Close' : 'Add new customer'}
            </button>
            {
                activeId &&
                <button
                    type="button"
                    onClick={onChangeButtonClick}
                >
                    {formsState.isVisibleChangeForm ? 'Close' : 'Change customer'}
                </button>
            }
            {
                activeId &&
                <button
                    type="button"
                    onClick={onDeleteButtonClick}
                >
                    {formsState.isVisibleDeleteForm ? 'Close' : 'Delete customer'}
                </button>
            }
        </div>
    );
};

export default EditPanel;
