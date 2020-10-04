import {useContext} from 'react';
import * as React from 'react';
import {NoteItem, NoteItemProps} from '../components/NoteItem';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export function Notes() {
    const [notes, setNotes] = React.useState<NoteItemProps[]>();
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

    const removeNote = React.useCallback(async (id: string) => {
        const upd = notes.filter(i => i._id !== id);
        setNotes(upd);
    }, [notes]);


    return (
        <>
            {notes ? (
                <div>
                    <h1>Notes</h1>
                    <hr />
                    {loading && <p>Loading...</p>}
                    {notes.map((note: NoteItemProps) => <NoteItem {...note} key={note._id} removeNote={removeNote} />)}
                </div>
                ) : <p>You have no notes</p>
            }
        </>)
}
