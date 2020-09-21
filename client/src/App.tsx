import * as React from 'react';
import {AuthContext} from './context/AuthContext';
import {useAuth} from './hooks/useAuth';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {Topbar} from './Topbar';

export function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = Boolean(token);
    const routes = useRoutes(isAuthenticated);

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
