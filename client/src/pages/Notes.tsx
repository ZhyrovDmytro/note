import {useContext} from 'react';
import * as React from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export function Notes() {
    const [notes, setNotes] = React.useState([]);
    const {req} = useHTTP();
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
        <div>
            {notes.map((item) => {
                return (
                    <div key={Math.random()}>
                        <h1>
                            {item.header}
                        </h1>
                        <p>{item.text}</p>
                    </div>
                );
            })}
        </div>)
}
