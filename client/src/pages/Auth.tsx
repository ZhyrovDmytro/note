import * as React from 'react';
import {useHTTP} from '../hooks/useHTTP';
import {useToast} from '../hooks/useToast';

export function Auth() {
    const [form, setForm] = React.useState({
        email: '', password: ''
    });
    const toast = useToast();
    const {loading, req, err, clearErr} = useHTTP();

    React.useEffect(() => {
        toast(err);
        clearErr();
    }, [err, toast, clearErr]);

    function handleForm(e: React.FormEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.id]: input.value})
    }

    async function registerHandler() {
        try {
            const data = await req('/api/auth/register', 'post', {...form}, {});
            toast(data.message);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div>
                <input placeholder="email" id="email" type="text" onChange={handleForm}/>
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input placeholder="password"  id="password" type="password" onChange={handleForm}/>
                <label htmlFor="password">Password</label>
            </div>
            <div>
                <button>
                    Login
                </button>
                <button onClick={registerHandler} disabled={loading}>
                    Register
                </button>
            </div>
        </div>
    )
}
