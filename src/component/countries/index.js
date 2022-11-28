import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

import Navbar from '../sideBar/main'

const drawerWidth = 260;

var columns = [
    {
        field: 'name',
        headerName: 'Country',
        width: 140,
        editable: true,
    },
   
    {
        field: 'currency_code',
        headerName: 'Currency Code',
        width: 180,
        editable: true,
    },
 
];

export default function Country() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [allCountries, setAllCountries] = useState([]);

    const navigate = useNavigate();
const countries = async () => {
    var token = window.localStorage.getItem("token");
    try {
        const response = await axios.get('https://api.medcollapp.com/api/countries', 
        {headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }},);
        setAllCountries(response?.data?.data)
        console.log(allCountries);
    }
    catch (error) {
        return (error.response.data.message)
    }
}
useEffect(() => {
    countries();
}, [])

    return (
        <>
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                <Navbar />
                <Grid container spacing={2}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row"
                >
                    <Grid item xs={12} >
                        <Typography variant="h5" noWrap={true}
                            style={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                color: '#000000',

                            }}>
                            Add Country
                    </Typography>
                    </Grid>
                    <Grid container direction='row'>
                        <Grid item xs={2}>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Country" variant="outlined" size="small" />
                            </div>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Vactor icon" variant="outlined" size="small" />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" />
                            </div>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Photos" variant="outlined" size="small" />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" />
                            </div>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Banner image" variant="outlined" size="small" />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Currency Code" variant="outlined" size="small" />
                            </div>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" />
                            </div>
                            <div>
                                <TextField className={classes.textField} id="outlined-basic" type='text' label="name" variant="outlined" size="small" />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <DataGrid
                            style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 600, color: '#2C7FB2', marginTop: 20, marginRight: 20 }}
                            rows={allCountries}
                            rowHeight={30}
                            columns={columns}
                            columnWidth={5}
                            // pageSize={norecords}
                        />
                    </Grid>

                </Grid> {/* main grid */}

            </div>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '70px 1px 20px 25px'
        // marginTop: 70,
        // marginLeft: 25,
        // marginRight: 1,
        // marginBottom: 20
    },
    gridShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    textField: {
        fontFamily: 'Poppins;',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        // height: 30,
    },
}));
