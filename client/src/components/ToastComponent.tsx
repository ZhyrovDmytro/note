import {Snackbar} from '@material-ui/core';
import * as React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {ContentProps} from '../context/ToastContext';

interface ToastProps {
    readonly autoDismiss: boolean;
    readonly content: ContentProps;
    remove(): void;
}
export const Toast = (props: ToastProps) => {
    const {autoDismiss, remove, content} = props;

    React.useEffect(() => {
        if (autoDismiss) {
            const timeoutHandle = setTimeout(remove, 4000);

            return () => clearTimeout(timeoutHandle)
        }
    }, [autoDismiss, remove]);

    return (
        <Snackbar
            open={!!content.text}
            onClose={remove}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Alert onClose={remove} severity={content.severity || 'error'}>
                {content.text}
            </Alert>
        </Snackbar>
    )
};

function Alert(props: AlertProps): JSX.Element {
    return (
        <MuiAlert elevation={6} variant="filled" {...props} />
    )
}
