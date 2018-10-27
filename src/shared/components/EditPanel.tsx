import React from 'react';

export interface OwnProps {
    labelButton: string,
    activeId: number | null,
    formsState: {
        isVisibleAddForm: boolean,
        isVisibleChangeForm: boolean,
        isVisibleDeleteForm: boolean,
    }
    onAddButtonClick(): void,
    onChangeButtonClick(): void,
    onDeleteButtonClick(): void,
}

const EditPanel:React.SFC<OwnProps> = (props: OwnProps) => {
    const {
        onAddButtonClick, onChangeButtonClick, onDeleteButtonClick,
        activeId, formsState, labelButton,
    } = props;

    return (
        <div>
            <button
                type="button"
                onClick={onAddButtonClick}
            >
                {formsState.isVisibleAddForm ? `Close` : `Add new ${labelButton}`}
            </button>
            {
                activeId &&
                <button
                    type="button"
                    onClick={onChangeButtonClick}
                >
                    {formsState.isVisibleChangeForm ? `Close` : `Change ${labelButton}`}
                </button>
            }
            {
                activeId &&
                <button
                    type="button"
                    onClick={onDeleteButtonClick}
                >
                    {formsState.isVisibleDeleteForm ? `Close` : `Delete ${labelButton}`}
                </button>
            }
        </div>
    );
};

export default EditPanel;
