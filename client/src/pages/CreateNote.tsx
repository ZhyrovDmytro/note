import {useContext} from 'react';
import * as React from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';

export function CreateNote(): JSX.Element {
    const auth = useContext(AuthContext);
    const {req} = useHTTP();

    const [form, setForm] = React.useState({
        headline: '', note: ''
    });
    function handleForm(e: React.FormEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.id]: input.value})
    }
    
    const handleKetPress = async (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            try {
                const data = await req('/api/note/create', 'POST', {header: form.headline, text: form.note}, {Authorization:
                    `Bearer ${auth.token}`
                });

                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div>
            <div>
                <input placeholder="Write headline"  id="headline" value={form.headline} onChange={handleForm}/>
                <label htmlFor="headline">Headline text</label>
            </div>
            <div>
                <input placeholder="Write note"  id="note" value={form.note} onChange={handleForm} onKeyPress={handleKetPress}/>
                <label htmlFor="note">Note text</label>
            </div>
        </div>
    );
}
