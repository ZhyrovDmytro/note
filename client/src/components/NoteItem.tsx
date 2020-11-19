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
    const {text, header, updateNote, removeNote, _id} = props;
    const {req} = useHTTP();
    const auth = React.useContext(AuthContext);
    const { addToast } = useToasts();
    const noteData = JSON.parse(text);
    const history = useHistory();
    const [form, setForm] = React.useState({
        headline: '', note: ''
    });

    function openDetail() {
        history.push(`/detail/${_id}`);
    }

    const handleDelete = React.useCallback(async () => {
        try {
            const data = await req(`/api/note/${_id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            removeNote(_id);
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

    function handleNoteValue(note: string, id: string) {
        setForm({...form, [id]: note})
    }

    const submitEdit = async () => {
        if(!form.note) {
            handleCloseModal();
            addToast({text: "Nothing changed", severity: 'warning'});
        } else {
            try {
                const edited = await req('/api/note/update', 'PUT', {header: header, form: form.note}, {Authorization:
                        `Bearer ${auth.token}`
                });

                updateNote(_id, edited.data.text);
                handleNoteValue(edited.data.text, 'note');
                handleCloseModal();
                addToast({text: "Note has been edited", severity: 'success'});
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <Paper>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h4"> {header}</Typography>
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
                <Typography style={{margin: '10px 0'}} variant="h4" component="h4"> {header}</Typography>
                <RichtextEditor editorValue={noteData} handleNoteValue={handleNoteValue} />
                <Button style={{marginTop: '20px'}} color="primary" variant='contained' onClick={submitEdit}>Edit</Button>
            </ModalLayer>
        </Paper>
    )
}
