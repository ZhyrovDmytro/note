import {AppBar, Toolbar, Typography, Link as MLink, Grid, Box} from '@material-ui/core';
import {useContext} from 'react';
import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useStyles} from './components/style-helper';
import {AuthContext} from './context/AuthContext';

export function Topbar(): JSX.Element {
    const history  = useHistory();
    const {logout, token} = useContext(AuthContext);
    const isLogedIn = Boolean(token);
    const classes = useStyles();
    
    function handleLogout(e: React.MouseEvent): void {
        e.preventDefault();
        logout();
        history.push('/');
    }
    return (
        <AppBar position="static" color='primary'>
            <Toolbar>
                <Grid container justify='space-between' direction='row'>
                    <Grid item>
                        <Grid container justify='space-between'>
                            <MLink href="/notes" color="secondary">
                                <Typography variant="h6" className={classes.topBar}>
                                    Notes
                                </Typography>
                            </MLink>
                            {isLogedIn &&(
                                <Box css={{marginLeft: '20px'}}>
                                    <MLink href="/create" color="secondary">
                                        <Typography variant="h6" className={classes.topBar}>
                                            Create
                                        </Typography>
                                    </MLink>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    {isLogedIn && (
                        <Grid item>
                            <Grid container justify='space-between'>
                                <Box>
                                    <MLink href="/" onClick={handleLogout} color="secondary">
                                        <Typography variant="h6" className={classes.topBar}>
                                            Logout
                                        </Typography>
                                    </MLink>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
