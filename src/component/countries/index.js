import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

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
            field: 'country_code',
            headerName: 'Country Code',
            width: 100,
            editable: true,
        },

        {
            field: 'name',
            headerName: 'Country Name',
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
            field: 'vactor_icon',
            headerName: 'Vector Icon',
            width: 120,
            editable: true,
            renderCell: (params) => <img src={params.value} style={{ width: '100%' }} />,
        },
        {
            field: 'banner_image',
            headerName: 'Banner Image',
            width: 150,
            editable: true,
            renderCell: (params) => <img src={params.value} style={{ width: '100%', height: '100%' }} />,
        },
        {
            field: 'Delete/Edit',
            headerName: 'Delete/Edit',
            width: 150,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        },

    ];

    // fuctionality on Submit button to add country

    const handleSubmit = async () => {
        var token = window.localStorage.getItem('token');
        const vectorIcon = document.querySelector("#vectorIcon");
        const bannerImage = document.querySelector("#bannerImage");
        const photos = document.querySelector("#photos");

        var formData = new FormData();
        formData.append('banner_image', bannerImage.files[0]);
        formData.append('country_code', formValues.countryCode);
        formData.append('currency_code', formValues.currencyCode);
        formData.append('currency_name', formValues.currencyName);
        formData.append('currency_symbol', formValues.currencySymbol);
        formData.append('language_code', formValues.languageCode);
        formData.append('name', formValues.countryName);
        formData.append('photos', photos.files[0]);
        formData.append('tags', formValues.tags);
        formData.append('vactor_icon', vectorIcon.files[0]);

        try {
            const addcountry = await axios.post(
                'https://api.medcollapp.com/api/country/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return JSON.stringify(addcountry?.data);
        } catch (error) {
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
            // window.location.reload()
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
                        margin: '5% 3% 2% 3%',
                        padding: '2%',
                        borderRadius: '0 15px',
                    }}
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
                    <Grid item xs={12} style={{textAlign: 'end'}}>
                        <Button
                            size="small"
                            style={{ marginLeft: 10, }}
                        // onClick={() => {
                        //     setOpenDeletemodal(true)
                        // }}
                        >
                            <Tooltip title="Add New Country" placement="top-start">
                                <ControlPointOutlinedIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#087a9c' }} />
                            </Tooltip>
                        </Button>
                    </Grid>
                    <Grid container direction='row'>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <TextField id="vectorIcon" className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.photos} name="photos" className={classes.textField} id="photos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />
                            </div>
                            <div>
                                <TextField style={{ marginTop: '10px' }} value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="bannerImage" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <TextField value={formValues.currencyCode} name="currencyCode" className={classes.textField} id="outlined-basic" type='text' label="currency Code" variant="outlined" size="small" onChange={handleChange} />
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
                            // getRowHeight={() => 'auto'}
                            style={{ height: 350, fontSize: 13, fontFamily: 'Poppins', fontWeight: 700, color: '#2C7FB2', backgroundColor: '#f0ffffd9', marginTop: 20, marginRight: 20 }}
                            rows={allCountries}
                            rowHeight={100}
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
