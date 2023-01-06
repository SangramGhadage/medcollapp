import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import DeleteState from './deleteState';
import EditState from './editState'
import AddState from "./addState";
import Navbar from "../sideBar/main";

const drawerWidth = 260;

export default function States() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openDeletemodal, setOpenDeletemodal] = React.useState(false);
    const [openEditmodal, setOpenEditmodal] = React.useState(false);
    const [openAddmodal, setOpenAddmodal] = React.useState(false);

    const [allCountries, setAllCountries] = useState([]);
    const [allStates, setAllStates] = useState([])
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');



    const renderDetailsButton = (params) => {
        return (
            <>
                <Button
                    size="small"
                    style={{ marginLeft: 10, }}
                    onClick={() => {
                        setOpenDeletemodal(true)
                    }}
                >
                    <Tooltip title="Delete Country" placement="top-start">
                        <DeleteIcon style={{ color: 'red' }} />
                    </Tooltip>
                </Button>
                <Button
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        setOpenEditmodal(true)
                    }}
                >
                    <Tooltip title="Edit Country" placement="top-start">
                        <BorderColorIcon />
                    </Tooltip>
                </Button>
            </>
        )
    }
    var columns = [
        {
            field: 'name',
            headerName: 'State',
            width: 180,
            editable: true,
        },

        {
            field: 'language_code',
            headerName: 'Language Code',
            width: 180,
            editable: true,
        },
        {
            field: 'Delete/Edit',
            headerName: 'Delete/Edit',
            width: 180,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,

        },

    ];
    //api to get country
    const countries = async () => {
        var token = window.localStorage.getItem("token");
        try {
            const response = await axios.get('https://api.medcollapp.com/api/countries',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            setAllCountries(response?.data?.data)
        }
        catch (error) {
            return (error.response.data.message)
        }
    };

    //api to get allstate by countryId on button click
    const handleStateView = async () => {
        console.log(country)
        let id = country
        var token = window.localStorage.getItem("token");
        try {
            const response = await axios.get('https://api.medcollapp.com/api/states/' + id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            setAllStates(response?.data?.data)
        }
        catch (error) {
            return (error.response.data.message)
        }
        // console.log(allStates)
    }
    const handleCellClick = async (row) => {
        setState(row)
        console.log(row)
    }

    const handleAddState = () =>{
            setOpenAddmodal(true)
            console.log(country);
    }
    useEffect(() => {
        countries();
    }, [])
    return (
        <>
            <div className={classes.root} style={{ }}>
                <Navbar />
                <Grid container spacing={2}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row" style={{backgroundColor: '#f0ffffd9',
                    border: '2px solid dodgerblue',
                    boxShadow: '10px 10px 3px 6px #fff4',
                    /* width: 100%; */
                    margin: '5% 3% 2% 3%',
                    padding: '2%',
                    borderRadius: '0 15px',}}
                >
                    <Grid item xs={12}>
                        {/* <h1>hello</h1> */}
                    </Grid>
                    <Grid item xs={3}>
                        <select id="dropdown" value={country} onChange={(e) => setCountry(e.target.value)} style={{ height: 30, border: '1px solid #F0F0F0', fontFamily: 'Poppins', paddingLeft: 15 }}>
                            <option value="N/A">Select</option>
                            {allCountries.map((item, index) => (<option value={item.id} key={index.id} >{item.name}</option>))}
                        </select>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={(e) => handleStateView(e)} className={classes.btn}>View State</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={(e) => handleAddState(e)} className={classes.btn}>Add State</Button>
                    </Grid>
                    <Grid item xs={12} >
                        <DataGrid
                            style={{ height: 350, fontSize: 13, fontWeight: 700,marginTop: 20, marginRight: 20 }}
                            rows={allStates}
                            rowHeight={40}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            columnWidth={5}
                            onRowClick={(newSelection) => {
                                handleCellClick(newSelection.row);
                            }}
                        />
                    </Grid>
                    {openDeletemodal ? <DeleteState show={openDeletemodal} data={state} handleclose={() => setOpenDeletemodal(false)} /> : null}

                    {openEditmodal ? <EditState show={openEditmodal} data={state} handleclose={() => setOpenEditmodal(false)} /> : null}

                    {openAddmodal ? <AddState show={openAddmodal} data={country} handleclose={() => setOpenAddmodal(false)} /> : null}
                </Grid >
            </div>

        </>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '70px 0 20px 25px'
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
        width: '90%',
    },
    btn: {
        color: "#ffffff !important",
        backgroundColor: '#407BFF !important',
        fontStyle: 'normal',
        fontWeight: 400,
        borderRadius: 9,
    }
}));