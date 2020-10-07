import {AnchorHTMLAttributes, useContext} from 'react';
import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';

export function Topbar(): JSX.Element {
    const history  = useHistory();
    const {logout, token} = useContext(AuthContext);
    const isLogedIn = Boolean(token);
    
    function handleLogout(e: React.MouseEvent): void {
        e.preventDefault();
        logout();
        history.push('/');
    }
    return (
        <nav>
            <Link to="/notes">Home</Link>
            {isLogedIn && (
                <>
                    <Link to="/create">Create</Link>
                    <a href="/" onClick={handleLogout}>Logout</a>
                </>
            )}
        </nav>
    );
}
