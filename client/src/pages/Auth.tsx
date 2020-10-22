import {Box, Button, Grid, Paper, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ChangeEvent, useContext} from 'react';
import * as React from 'react';
import {useStyles} from '../components/style-helper';
import {AuthContext} from '../context/AuthContext';
import {useHTTP} from '../hooks/useHTTP';
import {useToast} from '../hooks/useToast';

interface FormModel {
    email: string;
    password: string;
}

export function Auth() {
    const [form, setForm] = React.useState<FormModel>({
        email: '', password: ''
    });
    const [error, setError] = React.useState<FormModel>({
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
        setError({...error, [input.id]: ''});
        setForm({...form, [input.id]: input.value});
    }

    function formValidation(): boolean {
        let isValid: boolean = true;
        let errors: FormModel = {email: '', password: ''};

        if(!form.email) {
            isValid = false;

            errors['email'] = 'Email is required!'
        }

        if (typeof form.email !== "undefined") {

            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(form.email)) {
                isValid = false;
                errors.email = 'Please enter valid email address.';
            }
        }

        if(!form.password) {
            isValid = false;

            errors.password = 'Password is required!'
        }

        if (typeof form.password !== "undefined") {
            if(form.password.length < 6) {
                isValid = false;
                errors.password = 'Please add at least 6 character.';
            }
        }


        setError(errors);
        return isValid;
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
        if(formValidation()) {
            try {
                const data = await req('/api/auth/login', 'post', {...form}, {});
                login(data.token, data.userId);
                toast(data.message);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={classes.auth}>
            <Paper elevation={2}>
                <Box css={{padding: '20px', width: '400px'}}>
                    <Grid container alignItems={'center'}>
                        <Box css={{margin: '20px 0', display: 'flex'}}>
                            <Box css={{marginRight: '10px'}}>
                                <TextField id="email" label="Email" variant="outlined" onChange={handleForm}  error={!!error.email} helperText={error.email} />
                            </Box>
                            <Box>
                                <TextField id="password" type="password" label="Password" variant="outlined" onChange={handleForm} error={!!error.password} helperText={error.password} />
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
