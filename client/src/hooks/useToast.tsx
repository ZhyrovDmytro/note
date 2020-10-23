import {Snackbar} from '@material-ui/core';
import * as React from 'react';


export const useToast = () => {
    // const [toast, setToast] = React.useState({text: '',type: 'alert'});
    // const [shown, setShown] = React.useState(false);

    return React.useCallback((type): void => {
        if(type.text) {
            // setShown(true);
            alert(type.text);
        }
    }, []);
    //
    // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //
    //     setShown(false);
    // };
    //
    // return (text: string) => (<Snackbar
    //     anchorOrigin={{
    //         vertical: 'bottom',
    //         horizontal: 'left',
    //     }}
    //     open={shown}
    //     autoHideDuration={6000}
    //     onClose={handleClose}
    //     message={text}
    // />)
};
