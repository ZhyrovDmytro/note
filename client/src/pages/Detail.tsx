import {Button} from '@material-ui/core';
import * as React from 'react';
import {Headline} from '../components/Headline';
import {ModalLayer} from '../components/Modal';
import {RichtextEditor} from '../components/richtext/RichtextEditor';
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
    const [note, setNote] = React.useState<NoteProps>({_id: "", date: undefined, header: "", owner: "", text: ""});
    const auth = React.useContext(AuthContext);
    const noteId = useParams();

    const getNote = React.useCallback(async () => {
        try {
            const data = await req(`/api/note/${noteId.id}`, 'GET', null, {Authorization:
                    `Bearer ${auth.token}`});
            setNote(data);
        } catch (e) {
            console.error(e);
        }
    }, [auth]);

    if(loading && !note) {
        return <p>Loading...</p>
    }

    React.useEffect(() => {
        getNote();
    }, []);

    const handleEdit = () => {
        // TODO: add functionality
    };

    return (
        loading ? <p>Loading...</p> :
            <div>
                <span style={{fontStyle: 'italic'}}>{note.date}</span>
                <Headline text={note.header} />
                {note.text && (
                    <>
                        <RichtextEditor editorValue={JSON.parse(note.text)} />
                        <Button style={{marginTop: '20px'}} color="primary" variant='contained' onClick={handleEdit}>Edit</Button>
                    </>
                )}
            </div>

    )
}
