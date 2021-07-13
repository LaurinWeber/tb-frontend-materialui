import React, { useState, useEffect } from 'react'
import { InputAdornment, IconButton, Grid, Typography, TextField, Paper, Avatar, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import request from '../utils/request';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 80,
    },
    paper: {
        padding: 20,

        width: 250,
        margin: '20px auto'
    },
    avatar: {
        height: 80,
        width: 80
    },
    item: {
        padding: 10
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}));
const ERROR = {
    email: [false, ""],
    password: [false, ""],
}

const LOGIN = {
    id: 0,
    email: "",
    password: ""
}

//form validation
function formValuesCheck(login, setError) {
    //reset Errors
    setError(ERROR)

    let isOk = true;

    let eMail = [false, ""];
    const validMail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    /*if (accounts.filter(a => a.email === login.email).length > 0) {
        eMail = [true, "email already in use"];
    }*/
    if (!validMail.test(login.email)) {
        eMail = [true, "must be email format e.g. hans.muster@mail.ch"];
    }
    if (login.email == '') {
        eMail = [true, "empty"];
    }
    if (login.email.length > 255) {
        eMail = [true, "Max length 255 character" + " | Remove " + (login.email.length - 255) + " character(s)"];
    }
    if (eMail[0]) {
        setError((prevState) => ({
            ...prevState,
            email: eMail,
        }))
        isOk = false;
    }

    let ePassword = [false, ""];
    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    /*if (!validPassword.test(login.password)) {
        ePassword = [true, "min 8 char, [A-Z], [a-z], [#?!@$%^&*-] "];
    }*/
    if (login.password == '') {
        ePassword = [true, "empty"];
    }
    if (ePassword[0]) {
        setError((prevState) => ({
            ...prevState,
            password: ePassword,
        }))
        isOk = false;
    }
    return isOk;
}

export default function Login({ setIsLoggedIn, setIsAdmin }) {
    const history = useHistory();
    const classes = useStyles();
    const [login, setLogin] = useState(LOGIN)
    const [error, setError] = useState(ERROR)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    //instant form validation
    useEffect(() => {
        formValuesCheck(login, setError);
    }, [login])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Form validation after submit
        if (formValuesCheck(login, setError)) {
            let body = JSON.stringify(login);
            setIsLoading(true)

            let response = await request(
                'https://localhost:5001/login',
                "POST",
                body, setApiErrorMessage, "");

            //login successful?     
            if (!(response == null || response == undefined)) {
                localStorage.setItem("user", JSON.stringify(response))
                var token = parseJwt(response.token);

                //set Logged User
                setIsLoggedIn(true);
                setIsAdmin(false);
                if (token.actort === 'admin'){
                    setIsAdmin(true);
                }

                //reset
                setIsLoading(false);
                setApiErrorMessage(null);
                setLogin(() => ({
                    email: "",
                    password: ""
                }
                ))
                history.push('/profile')
            } else {
                //Errors
                setApiErrorMessage("Invalid Credentials");
                setError({ email: [true, ""], password: [true, ""] })
                //reset
                setIsLoading(false);
            }
        }
    }

    return (
        <Grid container className={classes.root}>

            <Paper elevation={10} className={classes.paper} >

                <Grid item xs={12} align={'center'} className={classes.item}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Grid>
                <Grid item xs={12} align={'center'} className={classes.item}>
                    <Typography variant="h5">
                        Sign in
                    </Typography>
                </Grid>
                {apiErrorMessage &&
                    <Grid item xs={12} className={classes.item} align="center">
                        <Alert severity="error" >{apiErrorMessage} </Alert>
                    </Grid>}
                {isLoading ?
                    <Grid item xs={12} className={classes.item} align="center">
                        <CircularProgress size={24} />
                    </Grid>
                    :
                    <>
                        <Grid item xs={12} className={classes.item}>
                            <TextField
                                value={login.email}
                                label={"Username"}
                                variant="standard"
                                placeholder={"hans.muster@mail.com"}
                                required
                                fullWidth
                                onChange={(e) => setLogin(prevState => (
                                    {
                                        ...prevState,
                                        email: e.target.value
                                    }
                                ))
                                }
                                error={error.email[0]}
                                helperText={error.email[0] && error.email[1]}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.item}>
                            <TextField
                                value={login.password}
                                label="Password"
                                variant="standard"
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                className={classes.field}
                                onChange={(e) => setLogin(prevState => (
                                    {
                                        ...prevState,
                                        password: e.target.value
                                    }
                                ))}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleShowPassword}
                                                onMouseDown={handleShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={error.password[0]}
                                helperText={error.password[0] && error.password[1]}
                            />
                        </Grid>
                    </>
                }
                <Grid item xs={12} className={classes.item}>
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        fullWidth
                        onClick={handleSubmit}
                    >

                        Sign In
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}


