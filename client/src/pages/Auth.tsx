import {Box, Button, Grid, Paper, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ChangeEvent, useContext} from 'react';
import * as React from 'react';
import {useStyles} from '../components/style-helper';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToast} from '../hooks/useToast';

export function Auth() {
    const [form, setForm] = React.useState({
        email: '', password: ''
    });
    const toast = useToast();
    const {login} = useContext(AuthContext);
    const {loading, req, err, clearErr} = useHTTP();
    const classes = useStyles();

    React.useEffect(() => {
        toast(err);
        clearErr();
    }, [err, toast, clearErr]);

    function handleForm(e: ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.id]: input.value})
    }

    async function registerHandler() {
        try {
            const data = await req('/api/auth/register', 'post', {...form}, {});
            data && toast(data.message);
        } catch (e) {
            console.error(e);
        }
    }

    async function loginHandler() {
        try {
            const data = await req('/api/auth/login', 'post', {...form}, {});
            login(data.token, data.userId);
            toast(data.message);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={classes.auth}>
            <Paper elevation={2}>
                <Box css={{padding: '20px', width: '400px'}}>
                    <Grid container alignItems={'center'}>
                        <Box css={{margin: '20px 0', display: 'flex'}}>
                            <Box css={{marginRight: '10px'}}>
                                <TextField id="email" label="Email" variant="outlined" onChange={handleForm}/>
                            </Box>
                            <Box>
                                <TextField id="password" type="password" label="Password" variant="outlined" onChange={handleForm}/>
                            </Box>
                        </Box>
                        <Grid container>
                            <Box css={{marginRight: '10px'}}>
                                <Button onClick={loginHandler} color='primary' variant='contained'>
                                    Login
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={registerHandler} disabled={loading} color='primary' variant='outlined'>
                                    Register
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}
