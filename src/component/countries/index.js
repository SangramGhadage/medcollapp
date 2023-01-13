import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { Box, Stack } from '@mui/material';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

import Navbar from '../sideBar/main'
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

    const navigate = useNavigate();
    const initialValues = { countryName: "", countryCode: "", languageCode: "", currencyCode: "", currencySymbol: "", vectorIcone: [], photos: [], bannerImage: [], tags: "", currencyName: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
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
            field: 'country_code',
            headerName: 'Code',
            width: 120,
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
            width: 160,
            renderCell: (params) => <img src={params.value} style={{ width: '100%' }} />,
        },
        {
            field: 'banner_image',
            headerName: 'Banner Image',
            width: 200,
            renderCell: (params) => <img src={params.value} style={{ width: '290px' }} />,
        },
        {
            field: 'Delete/Edit',
            headerName: 'Delete/Edit',
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
                        margin: '79px 3% 2% 248px',
                        padding: '2%',
                        borderRadius: '0 15px',
                    }}
                >
                    <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '0 30px 10px 30px' }}>
                       
                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', mt: '20px' }}>
                            <Typography variant='h5'>Country</Typography>
                            <Button
                                size="small"
                                style={{ marginLeft: 10, }}
                                onClick={() => {
                                    setOpenAddCountrymodal(true)
                                }}
                            >
                                <Tooltip title="Add New Country" placement="top-start">
                                    <ControlPointOutlinedIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#004dda' }} />
                                </Tooltip>
                            </Button>
                        </Stack>
                        <Grid item xs={12} >
                            <DataGrid
                                style={{ height: '500px', fontSize: 12, marginTop: 20,marginBottom: 20 }}
                                rows={allCountries}
                                rowHeight={150}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                columnWidth={5}
                                headerHeight={100}
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
    // grid: {
    //     overflow: 'hidden',
    //     whiteSpace: 'nowrap',
    //     textOverflow: 'ellipsis',
    //     // margin: '70px 0 20px 25px'
    // },
    // gridShift: {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width',], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
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
    }
}));
