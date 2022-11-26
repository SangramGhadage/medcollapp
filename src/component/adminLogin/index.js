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
                if(data.message === "Login Successfully"){
                    alert(data.message)
                    localStorage.setItem("user", JSON.stringify(data.data.user))
                    localStorage.setItem("token", data.data.token)
                    window.location.reload()
                }else{
                    alert(data.message)
                }
            })
    }

    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const payload = {
    //         email: email,
    //         password: password,
    //     };
    //     const res = await loginUser(payload);
    //     console.log({ payload, res });
    // };


    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return (

        <div className={classes.root}>
            <img src="companyLogo.jpeg" alt="logo" height='10px' style={{ flex: 1 }} />
            <div className={classes.loginBox}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1 style={{ fontSize: '1.5rem' }}>Login Here</h1>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <input type="hidden" name="_token" value={token}></input> */}
                            <TextField className={classes.textField} id="email" type='email' label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" size="small" required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField} id="password" type={showPassword ? 'text' : 'password'} label="Password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} variant="standard" size="small" required InputProps={{
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
                        <Grid item xs={12} md={6}>
                            <small style={{ color: '#000000', fontWeight: '600', fontSize: '0.8rem' }}>Forgot Password</small>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
};

const useStyles = makeStyles(() => ({
    root: {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:
            'center',
        alignItems: 'center'
    },
    loginBox: {
        maxWidth: '100%',
        width: `calc(100vw - 70vw)`,
        // height: '200px',
        // border: '2px solid red',
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'

    },
    textField: {
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        width: '80%',
        marginBottom: '20px'
    },
    btn: {
        backgroundColor: '#407BFF !important',
        color: '#fff !important',
        fontFamily: "Poppins",
        fontStyle: 'normal',
        fontWeight: 400,
        borderRadius: 9,
        width: '60%',
        fontSize: '1rem',
        marginBottom: 10,
        marginTop: 10
    }
}));