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
            <div>
                <label htmlFor="headline">Headline text</label>
                <div>
                    <input placeholder="Write headline"  id="headline" value={form.headline} onChange={handleForm}/>
                </div>
            </div>
            <div>
                <RichtextEditor handleNoteValue={handleNoteValue}/>
            </div>
            <button onClick={handleKeyPress}>create</button>
        </div>
    );
}
