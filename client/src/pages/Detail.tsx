import * as React from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useParams} from 'react-router-dom';

interface NoteProps {
    _id: string;
    header: string;
    text: string;
    owner: string;
    date: Date;
}
export function Detail(): JSX.Element {
    const {req, loading} = useHTTP();
    const [note, setNote] = React.useState<NoteProps>({});
    const auth = React.useContext(AuthContext);
    const noteId = useParams();

    React.useEffect(() => {
        getNote();
    }, []);

    const getNote = React.useCallback(async () => {
        const data = await req(`/api/note/${noteId.id}`, 'GET', null, {Authorization:
                `Bearer ${auth.token}`});

        setNote(data);
    }, [auth.token, noteId, req]);

    return (
        loading && !note ? <p>Loading...</p> : (
            <div>
                <h2>
                    {note.header}
                </h2>
                <p>{note.text}</p>
            </div>
        )
    )
}
