import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';

const loginapi = 'https://api.medcollapp.com/api/login';
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const loginUser = async (payload) => {
    const url = "https://api.medcollapp.com/api/login";
    return fetch(url, {
        crossDomain: true,
        credentials: 'same-origin',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json',
            "Access-Control-Allow-Origin":'*',
        },
        body: JSON.stringify(payload),
    }).then((response) => response.json());
};

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('https://api.medcollapp.com/api/login',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    "Access-Control-Allow-Origin":'*'
                },
                body: JSON.stringify({ email, password })
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.localStorage.setItem("token", data.token)

                if(data.message == "Login Successfully"){
                    window.localStorage.setItem("user", JSON.stringify(data.data.user))
                    window.localStorage.setItem("token", data.data.token)
                    navigate('/Dashboard')
                }else{
                    alert(data.message)
                }
            })
    }


    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (

        <div className={classes.root}>
            {/* <img src="companyLogo.jpeg" alt="logo" height='10px' style={{ flex: 1 }} /> */}
            <div className={classes.loginBox}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1 style={{ fontSize: '2.5rem', margin: '0' }}>Sign In</h1>
                            <small style={{color: '#777777', marginTop: '0', fontWeight: '700'}}>Enter your Email & Password to login</small>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField} id="email" type='email' label="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" size="small" required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField} id="password" type={showPassword ? 'text' : 'password'} label="Enter Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} variant="standard" size="small" required InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button type='submit' className={classes.btn}>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
};

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'flex-end',
    },
    loginBox: {
        maxWidth: '100%',
        width: '420px',
        textAlign: 'start',
        background: '#fff4',
        padding: '1.8rem',
        borderRadius: '24px',
        boxShadow: '4px 11px 12px -2px rgb(134 128 128 / 25%)',
        marginRight: '2%'

    },
    textField: {
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        width: '100%',
        marginBottom: '20px'
    },
    btn: {
        backgroundColor: '#004dda !important',
        color: '#fff !important',
        borderRadius: 9,
        width: '44%',
        fontSize: '1rem',
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'none !important',
    }
}));