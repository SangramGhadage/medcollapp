import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { Box, Stack, } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddIcon from '@mui/icons-material/Add';

import Navbar from '../sideBar/main'
import Loader from '../Loader';
import EditCountry from './editCountry'
import DeleteCountry from './deleteCountry';
import AddCounty from './addCounty';

const drawerWidth = 260;

export default function Country() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [openeditmodal, setOpenEditmodal] = React.useState(false);
    const [openDeletemodal, setOpenDeletemodal] = React.useState(false);
    const [openAddCountrymodal, setOpenAddCountrymodal] = React.useState(false);
    const [country, setCountry] = useState('');
    const [records, setrecords] = useState('5');

    const navigate = useNavigate();
    const renderDetailsButton = (params) => {
        return (
            <>
                {/* #28a745 */}
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
                    style={{ backgroundColor: '#dc3545 ', textTransform: 'none', color: '#fff', fontWeight: '700' }}
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
            field: 'country_code',
            headerName: 'Country Code',
            width: 140,
        },

        {
            field: 'name',
            headerName: 'Country Name',
            width: 170,
        },
        {
            field: 'currency_code',
            headerName: 'Currency Code',
            width: 180,
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
            renderCell: (params) => <img src={params.value} style={{ width: '290px' }} />,
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
            renderCell: () => <Button style={{ backgroundColor: '#28a745 ', textTransform: 'none', color: '#fff', fontWeight: '700' }}>Active</Button>
            // disableClickEventBubbling: true,
        },
        {
            field: 'Delete/Edit',
            headerName: 'Action(s)',
            width: 150,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        },

    ];

    //Api call to show all countries in table
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
    }
    useEffect(() => {
        countries();
    }, [])

    //get rowClick country
    const handleCellClick = async (row) => {
        setCountry(row)
        console.log(row)
    }
    const handleStatePage = () => {
        navigate('/States')
    }
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
                        margin: '71px 1% 2% 248px',
                        padding: '2%',
                        borderRadius: '0 15px',
                    }}
                >
                    <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '0 30px 10px 30px' }}>

                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', mt: '20px' }}>
                            <Typography variant='h5'>Country Master</Typography>
                            <Button
                                size="small"
                                style={{ marginLeft: 10, }}
                                onClick={() => {
                                    setOpenAddCountrymodal(true)
                                }}
                            >
                                <Tooltip title="Add New Country" placement="top-start">
                                    <AddIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#004dda', padding: '7px' }} />
                                </Tooltip>
                            </Button>
                        </Stack>
                        <Stack direction='row' spacing={1} alignItems= 'center' sx={{position: 'relative', top: '61px', zIndex: 1000, width: '200px'}}>
                            <Typography style={{color: '#777777', fontSize: '14px'}} variant='h6'>Show</Typography>

                            <select id="dropdown" value={records} onChange={(e) => setrecords(e.target.value)} style={{ width: 67, height: 37, border: '1px solid #F0F0F0', fontSize: '20px', padding: '3px', borderRadius: '5px', cursor: 'pointer'  }}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>

                            </select>
                            <Typography style={{color: '#777777', fontSize: '14px'}} variant='h6'>entries</Typography>
                        </Stack>
                        <Grid item xs={12} style={{ height: '950px' }}>
                            <DataGrid
                                className={classes.dataGrid}
                                rows={allCountries}
                                rowHeight={150}
                                columns={columns}
                                pageSize={records}
                                rowsPerPageOptions={[5]}
                                columnWidth={5}
                                headerHeight={100}
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
                    {openeditmodal ? <EditCountry show={openeditmodal} data={country} handleclose={() => setOpenEditmodal(false)} /> : null}

                    {openDeletemodal ? <DeleteCountry show={openDeletemodal} data={country} handleclose={() => setOpenDeletemodal(false)} /> : null}

                    {openAddCountrymodal ? <AddCounty show={openAddCountrymodal} handleclose={() => setOpenAddCountrymodal(false)} /> : null}

                </Grid> {/* main grid */}

            </div>
        </>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,

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
        height: '930px', border: 'none', fontSize: 14, marginTop: 20, marginBottom: 20,
        "& .MuiDataGrid-columnHeaderTitle": {
            overflow: "clip",
            lineHeight: "1",
            whiteSpace: "break-spaces",
            fontWeight: 'bold'
        },
    }
}));
