import * as React from 'react';
import {useAuth} from './hooks/useAuth';
import {useRoutes} from './routes';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export function App() {
    const {token, login, logout, userID} = useAuth();
    const routes = useRoutes(false);

    return(
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/notes">notes</Link>
                <Link to="/create">create</Link>
            </nav>
            <div>
                {routes}
            </div>
        </Router>
    )
}
