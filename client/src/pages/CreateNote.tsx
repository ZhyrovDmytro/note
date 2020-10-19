import {Button, TextField, Typography} from '@material-ui/core';
import {useContext} from 'react';
import * as React from 'react';
import {RichtextEditor} from '../components/richtext/RichtextEditor';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useHistory} from 'react-router-dom';


export function CreateNote(): JSX.Element {
    const auth = useContext(AuthContext);
    const {req} = useHTTP();
    const history = useHistory();

    const [form, setForm] = React.useState({
        headline: '', note: ''
    });

    function handleForm(e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.id]: input.value})
    }

    function handleNoteValue(note: string, id: string) {
        setForm({...form, [id]: note})
    }
    
    const handleKeyPress = async () => {
        try {
            const data = await req('/api/note/create', 'POST', {header: form.headline, text: form.note}, {Authorization:
                `Bearer ${auth.token}`
            });

            history.push(`/detail/${data.newNote._id}`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <Typography variant='h2'>Create note</Typography>
            <div>
                <TextField id="headline" label="Headline" onChange={handleForm} value={form.headline} />
            </div>
            <div>
                <RichtextEditor handleNoteValue={handleNoteValue}/>
            </div>
            <Button variant="outlined" onClick={handleKeyPress}>create</Button>
        </div>
    );
}
