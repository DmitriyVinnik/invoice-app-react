import React from 'react';
import Redux from 'redux';
import {connect} from 'react-redux';
import {Actions} from '../redux/toast/AC';
import {ToastState} from '../redux/toast/states';
import {RootState} from '../redux/store';

import {withStyles, WithStyles, createStyles, Theme, StyleRules} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = (theme: Theme): StyleRules => createStyles({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

interface WithStylesProps extends WithStyles<typeof styles> {
}

interface StateProps extends ToastState {
}

interface DispatchProps {
    closeToast: () => void
}

type Props = StateProps & DispatchProps & WithStylesProps

const Toast = withStyles(styles)((props: Props) => {
    const {message, error, closeToast, isOpen, classes} = props;
    const handleClose = () => {
        // event, reason
        // if (reason === 'clickaway') {
        //     return;
        // }
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
        <Typography classes={classes}>
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
        </Typography>
    );
});

const mapStateToProps = (state: RootState): StateProps => ({
    isOpen: state.toast.isOpen,
    message: state.toast.message,
    error: state.toast.error,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Actions>): DispatchProps => (
    {
        closeToast: () => {
            dispatch(Actions.hideToast());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Toast);
