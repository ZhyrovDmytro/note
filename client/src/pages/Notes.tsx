import {Box, Grid, GridList, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useContext} from 'react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {Headline} from '../components/Headline';
import {NoteItem, NoteItemProps} from '../components/NoteItem';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export function Notes() {
    const [notes, setNotes] = React.useState<NoteItemProps[]>();
    const {req, loading} = useHTTP();
    const auth = useContext(AuthContext);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }));

    const classes = useStyles();

    const fetchNotes = React.useCallback(async () => {
        try {
            const notesData = await req('/api/note', 'GET', null, {Authorization:
                    `Bearer ${auth.token}`
            });
            setNotes(notesData);
        } catch (e) {
            console.error(e);
        }
    }, [auth, req]);

    React.useEffect( () => {
        fetchNotes();
    }, [fetchNotes]);

    const removeNote = React.useCallback(async (id: string) => {
        const upd = notes.filter(i => i._id !== id);
        setNotes(upd);
    }, [notes]);

    return (
        <>
            {notes && notes.length ? (
                <div>
                   <Headline text="Notes" />
                    {loading && <Typography>Loading...</Typography>}
                    <Grid container className={classes.root} spacing={1}>
                        <Grid item xs={12}>
                            <Grid container spacing={3} alignItems={'flex-start'} alignContent={'flex-start'}>
                                {notes.map((note: NoteItemProps) => (
                                    <Grid key={note._id} item>
                                        <NoteItem {...note} key={note._id} removeNote={removeNote} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <>
                    <Typography variant="h3" component="h3">You have no notes :(</Typography>
                    <Typography>Create note <Link to="/create">here</Link></Typography>
                </>
            )}
        </>)
}
