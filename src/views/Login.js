import React, { useState } from 'react'
import { Grid, Typography, TextField, Paper, Avatar, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import request from '../utils/request';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 20,
        height: 350,
        width: 200,
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

export default function Login() {
    const history = useHistory();
    const classes = useStyles();
    const [login, setLogin] = useState({
        id: 0,
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: false,
        password: false
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        //reset errors
        setError((prevState) => ({
            ...prevState,
            email: false,
            password: false,
        }))

        //checks
        if (login.email == '') {
            setError((prevState) => ({
                ...prevState,
                email: true,
            }))
        }
        if (login.password == '') {
            setError((prevState) => ({
                ...prevState,
                password: true,
            }))
        }

        if (login.email !== '' && login.passowrd !== '' && !isLoading) {
            let body = JSON.stringify(login);
            setIsLoading(true)
            let response = await request(
                'https://localhost:5001/login',
                "POST",
                body);
            console.log("response: ", response)
            setIsLoading(false)
            setLogin(()=>({
                email: "",
                password: ""
            }))
            history.push('/')
        }
    }

    return (
        <Grid container>
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
                {isLoading ?
                    <Grid item xs={12} className={classes.item} align="center">
                        <CircularProgress size={24} />
                    </Grid>
                    :
                    <>
                        <Grid item xs={12} className={classes.item}>
                            <TextField
                                label={"Username"}
                                placeholder={"hans.muster@mail.com"}
                                required
                                onChange={(e) => setLogin(prevState => (
                                    {
                                        ...prevState,
                                        email: e.target.value
                                    }
                                ))
                                }
                                error={error.email}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.item}>
                            <TextField
                                type="password"
                                label={"Password"}
                                placeholder={"myStron6Pwd$"}
                                required
                                onChange={(e) => setLogin(prevState => (
                                    {
                                        ...prevState,
                                        password: e.target.value
                                    }
                                ))
                                }
                                error={error.password}
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

