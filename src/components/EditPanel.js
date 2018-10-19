import React from 'react';
import PropTypes from 'prop-types';

const EditPanel = props => {
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

EditPanel.propTypes = {
    onAddButtonClick: PropTypes.func.isRequired,
    onChangeButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    formsState: PropTypes.objectOf(PropTypes.bool),
};

export default EditPanel;
