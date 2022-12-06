
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Slide, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditCountry = ({ show, data, handleclose }) => {
    console.log(data)
    const classes = useStyles();
    const navigate = useNavigate();

    const [maxWidth, setMaxWidth] = React.useState('md');

    const handleEditCountry =async () => {
        var token = window.localStorage.getItem("token");
        console.log(token)
        const getCountryById = await axios.post('https://api.medcollapp.com/api/country/update/11', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                // "Authorization": 'Bearer '+token,
            }
        });
    }

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Country"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                      
                                <Grid item xs={12} sm={6}>
                                    <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button onClick={handleEditCountry} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
                                        Submit
                                    </Button>
                                </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default EditCountry

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    btn: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },

}));