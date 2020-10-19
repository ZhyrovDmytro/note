import {AppBar, Toolbar, Typography, Link as MLink, Grid} from '@material-ui/core';
import {useContext} from 'react';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
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
        <AppBar position="static">
            <Toolbar>
                <Grid container justify='space-between' direction='row'>
                    <div>
                        <Grid item xs={1}>
                            <MLink href="/notes" color="secondary">
                                Home
                            </MLink>
                        </Grid>
                    </div>
                    {isLogedIn && (
                        <Grid item>
                            <Grid container justify='space-between'>
                                <MLink href="/create" color="secondary">
                                    Create
                                </MLink>{' '}
                                <MLink href="/" onClick={handleLogout} color="secondary">
                                    Logout
                                </MLink>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
