import {Button, Card, CardActions, CardContent, Grid, Paper, Typography} from '@material-ui/core';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToasts} from '../hooks/useToast';
import {ModalLayer} from './Modal';
import {RichtextEditor} from './richtext/RichtextEditor';

export interface NoteItemProps {
    header: string;
    text: string;
    _id: string;
    removeNote(id: string): void
    updateNote(id: string, text: string): void;
}

export function NoteItem(props: NoteItemProps): JSX.Element {
    const [openModal, setOpenModal] = React.useState(false);
    const {req} = useHTTP();
    const auth = React.useContext(AuthContext);
    const { addToast } = useToasts();
    const noteData = JSON.parse(props.text);
    const history = useHistory();

    function openDetail() {
        history.push(`/detail/${props._id}`);
    }

    const handleDelete = React.useCallback(async () => {
        try {
            const data = await req(`/api/note/${props._id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            props.removeNote(props._id);
            addToast({text: data.message, severity: 'success'});
        } catch (e) {
            addToast({text: "Error :(", severity: 'error'});
            console.error(e);
        }
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleEdit = React.useCallback((newValue: string) => {
        props.updateNote(props._id, newValue);
    }, []);

    const submitEdit = async () => {
        try {
            const edited = await req('/api/note/update', 'PUT', {header: props.header, text: props.text}, {Authorization:
                    `Bearer ${auth.token}`
            });
            console.log(edited);
            props.updateNote(props._id, edited.data.text);
            handleCloseModal();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Paper>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h4"> {props.header}</Typography>
                    <div style={{maxWidth: '250px', maxHeight: '450px', overflow: 'hidden'}}>
                        <RichtextEditor editorValue={noteData} readOnly />
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={openDetail} variant='outlined'>More</Button>
                    <Button size="small" onClick={handleDelete} variant='contained' color='secondary'>Delete</Button>
                    <Button size="small" onClick={handleOpenModal} variant='contained' color='primary'>Open Modal</Button>
                </CardActions>
            </Card>
            <ModalLayer handleClose={handleCloseModal} open={openModal}>
                <Typography style={{margin: '10px 0'}} variant="h4" component="h4"> {props.header}</Typography>
                <RichtextEditor editorValue={noteData} handleEdit={handleEdit} />
                <Button style={{marginTop: '20px'}} color="primary" variant='contained' onClick={submitEdit}>Edit</Button>
            </ModalLayer>
        </Paper>
    )
}
