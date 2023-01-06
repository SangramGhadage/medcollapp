import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Slide, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, } from "@material-ui/core";
import { Stack } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default function AddCounty({ show, handleclose }) {

    const initialValues = { countryName: "", countryCode: "", languageCode: "", currencyCode: "", currencySymbol: "", vectorIcone: [], photos: [], bannerImage: [], tags: "", currencyName: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const classes = useStyles();
    const [maxWidth, setMaxWidth] = React.useState('md');

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

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack spacing={2} direction='row'>
                            <TextField value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />

                            <TextField style={{ marginTop: '10px' }} value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>
                        <Stack spacing={2} direction='row'>
                            <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.currencyCode} name="currencyCode" className={classes.textField} id="outlined-basic" type='text' label="currency Code" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.currencySymbol} name="currencySymbol" className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>
                        <Stack spacing={2} direction='row'>
                            <TextField id="vectorIcon" className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                            <TextField style={{ marginTop: '10px' }} value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="bannerImage" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />

                            <TextField style={{ marginTop: '10px' }} value={formValues.photos} name="photos" className={classes.textField} id="photos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                        </Stack>
                        <Stack spacing={2} direction='row'>
                            <TextField style={{ marginTop: '10px' }} value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />

                        </Stack>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={() => handleSubmit(formValues)} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
                                    Add
                                </Button>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}
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
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },

}));