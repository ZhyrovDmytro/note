import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import * as React from 'react';
import Modal from '@material-ui/core/Modal';

interface ModalProps {
    readonly open: boolean;
    handleClose(): void;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        overflow: 'auto',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: '50vw',
            height: '70vh',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(1, 4, 2),
        },
    }),
);


export function ModalLayer(props: React.PropsWithChildren<ModalProps>): JSX.Element {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const {handleClose, open, children} = props;
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropProps={{
                timeout: 500,
            }}
        >
                <div style={modalStyle} className={classes.paper}>
                    {children}
                </div>
        </Modal>
    )
}
