import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hideToast} from '../redux/toast/AC/index';

import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
    typography: {
        useNextVariants: true,
    },
});

let Toast = (props) => {
    const {message, error, closeToast, isOpen, classes} = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        closeToast();
    };
    const getMessageContent = () => {
        if (error) {
            return (
                <span>{error}</span>
            )
        }

        return (
            <span>{message}</span>
        )
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={getMessageContent()}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        </div>
    );
};

Toast.propTypes = {
    classes: PropTypes.object.isRequired,
    closeToast: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string,
    error: PropTypes.object,
};

Toast = withStyles(styles)(Toast);

const mapStateToProps = state => ({
    isOpen: state.toast.isOpen,
    message: state.toast.message,
    error: state.toast.error,
});

const mapDispatchToProps = dispatch => (
    {
        closeToast: () => {
            dispatch(hideToast());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
