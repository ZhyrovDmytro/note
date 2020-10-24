import {Button, Card, CardActions, CardContent, Grid, Paper, Typography} from '@material-ui/core';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToasts} from '../hooks/useToast';
import {RichtextEditor} from './richtext/RichtextEditor';

export interface NoteItemProps {
    header: string;
    text: string;
    _id: string;
    removeNote(id: string): void
}

export function NoteItem(props: NoteItemProps): JSX.Element {
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
            addToast(data.message);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Paper >
            <Card>
                <CardContent>
                <Typography variant="h4" component="h4"> {props.header}</Typography>
                <div>
                    <RichtextEditor value={noteData} />
                </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={openDetail}>More</Button>
                    <Button size="small" onClick={handleDelete}>Delete</Button>
                </CardActions>
            </Card>
        </Paper>
    )
}
