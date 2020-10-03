import * as React from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export interface NoteItemProps {
    header: string;
    text: string;
    id: string;
}

export function NoteItem(props: NoteItemProps): JSX.Element {
    const {req} = useHTTP();
    const auth = React.useContext(AuthContext);

    const handleDelete = React.useCallback(async () => {
        try {
            await req(`/api/note/${props.id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div>
            <div>
                <h2>
                    {props.header}
                </h2>
                <p>{props.text}</p>
            </div>
            <div>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}
