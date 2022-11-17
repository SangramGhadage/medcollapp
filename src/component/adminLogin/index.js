import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [showPassword, setshowPassword] = useState(false);


    const handleLogin = () => {
        // alert("hello")
        navigate('/sideBar')
    }
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return (
        <div className={classes.root}>
            <img src="companyLogo.jpeg" alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
            <div className={classes.loginBox}>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1 style={{ fontSize: '1.5rem' }}>Login Here</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField} id="standard-basic" type='email' label="Email" variant="standard" size="small" required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField} id="standard-basic" type={showPassword ? 'text' : 'password'} label="Password" variant="standard" size="small" required InputProps={{
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
                            <Button type='submit' className={classes.btn} onClick={handleLogin}>Submit</Button>
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
        justifyContent: 'center',
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