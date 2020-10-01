import {useContext} from 'react';
import * as React from 'react';
import {NoteItem, NoteItemProps} from '../components/NoteItem';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export function Notes() {
    const [notes, setNotes] = React.useState([]);
    const {req, loading} = useHTTP();
    const auth = useContext(AuthContext);

    const fetchNotes = React.useCallback(async () => {
        try {
            const notesData = await req('/api/note', 'GET', null, {Authorization:
                    `Bearer ${auth.token}`
            });
            setNotes(notesData);
        } catch (e) {
            console.error(e);
        }
    }, [auth]);

    React.useEffect( () => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <>
            {notes ? (
                <div>
                    <h1>Notes</h1>
                    {loading && <p>Loading...</p>}
                    {notes.map((note: NoteItemProps) => <NoteItem header={note.header} text={note.text} key={note.header} />)}
                </div>
                ) : <p>You have no notes</p>
            }
        </>)
}
