import * as React from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToast} from '../hooks/useToast';
import {RichText} from './RichText';

export interface NoteItemProps {
    header: string;
    text: string;
    _id: string;
    removeNote(id: string): void
}

const style = {
    display: 'flex',
    alignItems: 'center'
};

export function NoteItem(props: NoteItemProps): JSX.Element {
    const {req} = useHTTP();
    const auth = React.useContext(AuthContext);
    const toast = useToast();
    const noteData = JSON.parse(props.text);

    const handleDelete = React.useCallback(async () => {
        try {
            const data = await req(`/api/note/${props._id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            props.removeNote(props._id);
            toast(data.message);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div style={style}>
            <div style={{marginRight: '20px'}}>
                <h2>
                    {props.header}
                </h2>
                <div>
                    <RichText value={noteData} />
                </div>
            </div>
            <div>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}
