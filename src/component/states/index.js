import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { Box, Stack } from '@mui/material';
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

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
                    style={{ backgroundColor: '#ffc107 ', textTransform: 'none', color: '#fff', marginRight: '5px', fontWeight: '700' }}
                    onClick={() => {
                        setOpenEditmodal(true)
                    }}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    style={{ backgroundColor: '#dc3545 ', textTransform: 'none', color: '#fff',fontWeight: '700' }}
                    onClick={() => {
                        setOpenDeletemodal(true)
                    }}
                >
                    Delete
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
            field: 'vactor_icon',
            headerName: 'Vector Icon',
            width: 140,
            renderCell: (params) => <img src={params.value} style={{ width: '100%' }} />,
        },
        {
            field: 'banner_image',
            headerName: 'Banner Image',
            width: 290,
            renderCell: (params) => <img src={params.value} style={{ width: '100%' }} />,
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
            renderCell: () => <Button style={{ backgroundColor: '#28a745 ', textTransform: 'none', color: '#fff',fontWeight: '700' }}>Active</Button>
            // disableClickEventBubbling: true,
        },
        {
            field: 'Delete/Edit',
            headerName: 'Action(s)',
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

    const handleAddState = () => {
        if (country === '') {
            alert("please select Country")
        } else {

            setOpenAddmodal(true)
        }
        console.log(country);
    }
    useEffect(() => {
        countries();
    }, [])
    return (
        <>
            <div className={classes.root} style={{}}>
                <Navbar />
                <Grid container spacing={2}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row" style={{
                        backgroundColor: '#f0ffffd9',
                        border: '2px solid dodgerblue',
                        boxShadow: '10px 10px 3px 6px #fff4',
                        /* width: 100%; */
                        margin: '79px 1% 2% 248px',
                        padding: '2%',
                        borderRadius: '0 15px',
                    }}
                >
                    <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '10px 30px 10px 30px' }}>
                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', mt: '20px' }}>
                        <Typography variant='h5'>State Master</Typography>
                        <Button
                                    size="small"
                                    style={{ marginLeft: 10, }}
                                    onClick={(e) => handleAddState(e)}
                                >
                                    <Tooltip title="Add New State" placement="top-start">
                                        <ControlPointOutlinedIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#004dda' }} />
                                    </Tooltip>
                                </Button>
                        </Stack>

                        <Stack direction='row' spacing={3} justifyContent='space-between' sx={{ mt: '20px' }}>
                            <Stack direction='row' spacing={4}>
                                <select id="dropdown" value={country} onChange={(e) => setCountry(e.target.value)} style={{ height: '37px', width: '200px', border: '1px solid #F0F0F0', paddingLeft: 15 }}>
                                    <option value="N/A">Select Country</option>
                                    {allCountries.map((item, index) => (<option value={item.id} key={index.id} >{item.name}</option>))}
                                </select>


                                <Button onClick={(e) => handleStateView(e)} className={classes.btn}>View State</Button>
                            </Stack>
                            {/* <Button onClick={(e) => handleAddState(e)} className={classes.btn}>Add State</Button> */}

                        </Stack>
                        <Grid item xs={12} style={{ height: '950px' }}>
                            <DataGrid
                                className={classes.dataGrid}
                                rows={allStates}
                                rowHeight={100}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                columnWidth={5}
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                components={{ Toolbar: GridToolbar }}
                                componentsProps={{
                                    toolbar: {
                                        csvOptions: { disableToolbarButton: 'true' },
                                        printOptions: { disableToolbarButton: 'true' },
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 },
                                    },
                                }}
                                onRowClick={(newSelection) => {
                                    handleCellClick(newSelection.row);
                                }}
                            />
                        </Grid>
                    </Box>
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
        fontWeight: 700,
        borderRadius: 9,
        textTransform: 'none !important',
    },
    dataGrid: {
        height: '930px', border: 'none', fontSize: 14, marginTop: 20,marginBottom: 20 ,
        "& .MuiDataGrid-columnHeaderTitle": {
            overflow: "clip",
            lineHeight: "1",
            whiteSpace: "break-spaces",
            fontWeight: 'bold'
          },
          "& .css-1e2bxag-MuiDataGrid-root": {
            border: 'none !important'
        }
    }
}));