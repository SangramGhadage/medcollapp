import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import Navbar from '../sideBar/main'
import EditCountry from './editCountry'
import DeleteCountry from './deleteCountry'

const drawerWidth = 260;

export default function Country() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [openeditmodal, setOpenEditmodal] = React.useState(false);
    const [openDeletemodal, setOpenDeletemodal] = React.useState(false);
    const [country, setCountry] = useState('');
    const [vectorIcone, setVectorIcon] = useState('')

    const navigate = useNavigate();
    const initialValues = { countryName: "", countryCode: "", languageCode: "", currencyCode: "", currencySymbol: "", vectorIcone: [], photos: [], bannerImage: [], tags: "", currencyName: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const file = e.target.files;
        setVectorIcon(file)
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
            field: 'name',
            headerName: 'Country',
            width: 180,
            editable: true,
        },

        {
            field: 'country_code',
            headerName: 'Country Code',
            width: 180,
            editable: true,
        },
        {
            field: 'currency_code',
            headerName: 'Currency Code',
            width: 180,
            editable: true,
        },
        {
            field: 'currency_name',
            headerName: 'Currency Name',
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

    // fuctionality on Submit button to add country
    const handleSubmit = async () => {
        var token = window.localStorage.getItem("token");
        const object = {
            banner_image: formValues.bannerImage,
            country_code: formValues.countryCode,
            currency_code: formValues.currencyCode,
            currency_name: formValues.currencyName,
            currency_symbol: formValues.currencySymbol,
            language_code: formValues.languageCode,
            name: formValues.countryName,
            photos: formValues.photos,
            tags: formValues.tags,
            vactor_icon: formValues.vectorIcone

        }
        try {
            const addcountry = await axios.post('https://api.medcollapp.com/api/country/add', object,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            return JSON.stringify(addcountry?.data);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    };

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
            <div className={classes.root} style={{ backgroundColor: '#ffffff' }}>
                <Navbar />
                <Grid container spacing={2}
                    className={clsx(classes.grid, {
                        [classes.gridShift]: open,
                    })}
                    direction="row"
                >
                    <Grid item xs={6} >
                        <Typography variant="h5" noWrap={true}
                            style={{
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                textOverflow: 'ellipsis',
                                color: '#000000',

                            }}>
                            Add Country
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Button className={classes.btn} onClick={() => handleStatePage()}>States</Button>
                    </Grid>
                    <Grid container direction='row'>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <TextField className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" id="outlined-basic" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.photos} name="photos" className={classes.textField} id="outlined-basic" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="outlined-basic" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.currencySymbol} name="currencySymbol" className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.btn} onClick={() => handleSubmit(formValues)}>Submit</Button>
                    </Grid>
                    <Grid item xs={12} >
                        <DataGrid
                            style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 700, color: '#2C7FB2', marginTop: 20, marginRight: 20 }}
                            rows={allCountries}
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
                    {openeditmodal ? <EditCountry show={openeditmodal} data={country} handleclose={() => setOpenEditmodal(false)} /> : null}

                    {openDeletemodal ? <DeleteCountry show={openDeletemodal} data={country} handleclose={() => setOpenDeletemodal(false)} /> : null}

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
