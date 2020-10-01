import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {AuthContext} from './context/AuthContext';
import {useAuth} from './hooks/useAuth';
import {useRoutes} from './routes';
import {Topbar} from './Topbar';

export function App() {
    const {token, login, logout, userId, ready} = useAuth();
    const isAuthenticated = Boolean(token);
    const routes = useRoutes(isAuthenticated);

    if(!ready) {
        return <p>Loading...</p>
    }
    return(
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                <Topbar/>
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}
