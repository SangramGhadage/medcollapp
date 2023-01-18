import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogContent, DialogContentText, Grid, Typography, } from "@material-ui/core";
import { Stack } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@mui/material/Divider';
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
            alert('Contry Added')
            window.location.reload()
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
                className= {classes.root}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack direction='row' justifyContent='space-between' sx={{ mb: '10px' }}>
                            <Typography style={{ color: '#000' }} variant='h5'>Add Country</Typography>
                            <CloseIcon onClick={handleclose} style={{ color: '#000', cursor: 'pointer' }} />
                        </Stack>
                        <Divider/>
                        <Stack direction='row' spacing={3} gap='10px' sx={{ mb: '20px', mt: '20px' }}>

                            <TextField style={{width: '545px'}} value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country Name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField style={{width: '300px'}}  value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>

                        <Stack direction='row' spacing={2} gap='10px' sx={{ mb: '20px' }}>

                            <TextField value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.currencyCode} name="currencyCode" className={classes.textField} id="outlined-basic" type='text' label="currency Code" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.currencySymbol} name="currencySymbol" className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>

                        <Stack direction='column' spacing={2} gap='10px' width='100%' sx={{ mb: '20px' }}>
                            <TextField id="vectorIcon" className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} inputProps={{ accept: 'image/*' }} />

                        </Stack>
                        <Stack direction='column' spacing={2} gap='10px' width='100%' sx={{ mb: '20px' }}>
                            <TextField value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="bannerImage" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} inputProps={{ accept: 'image/*' }} />

                        </Stack>
                        <Stack direction='column' spacing={2} gap='10px' width='100%' sx={{ mb: '20px' }}>
                            <TextField value={formValues.photos} name="photos" className={classes.textField} id="photos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} inputProps={{ accept: 'image/*' }} />

                        </Stack>
                        <Stack direction='column' spacing={2} gap='10px' width='100%' sx={{ mb: '20px' }}>
                            <TextField value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />

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
        "& .MuiDialog-scrollPaper": {
            alignItems: 'start !important',
            justifyContent: 'end !important'
        }
    },
    btn: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px',
        textTransform: 'none !important',
    },
    textField: {
        // width: '400px',
    }

}));
