import * as React from 'react';
import {useHTTP} from '../hooks/useHTTP';

export function Auth() {
    const [form, setForm] = React.useState({
        email: '', password: ''
    });
    const {loading, req} = useHTTP();

    function handleForm(e: React.FormEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.id]: input.id})
    }

    async function registerHandler() {
        try {
            const data = await req('http://localhost:5000/api/auth/register', 'POST', {...form}, {accepts:"application/json"});
            console.log(data);
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
