import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Stack, TextField } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default function UpdateHospital({ show, hospital, handleclose }) {
    const classes = useStyles();
    const [maxWidth, setMaxWidth] = React.useState('md');

    const initialValues = {
        hospitalName: hospital ? hospital.name : '',
        hospitalCity: hospital ? hospital.city : '',
        hospitalPostalCode: hospital ? hospital.postal_code : '',
        hospitalAddress: hospital ? hospital.address : '',
        hospitalLogo: [], 
        hospitalBannerImage: [],
        hospitalPhotos: [],
        hospitaltags: hospital ? hospital.tags : ''
    }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = async () => {
        var token = window.localStorage.getItem('token');
        const id = hospital.id
        const banner_image = document.querySelector("#uhospitalBannerImage");
        const logo = document.querySelector("#uhospitalLogo");
        const photos = document.querySelector("#uhospitalPhotos");


        var formData = new FormData();
        formData.append('name', formValues.hospitalName)
        formData.append('city', formValues.hospitalCity);
        formData.append('postal_code', formValues.hospitalPostalCode);
        // formData.append('country_id', country);
        // formData.append('state_id', state);
        formData.append('address', formValues.hospitalAddress);
        formData.append('treatment', formValues.diseaseTreatment);
        formData.append('logo', logo.files[0]);
        formData.append('photos[]', photos.files[0]);
        formData.append('banner_image', banner_image.files[0]);
        formData.append('tags', formValues.hospitaltags);

        try {
            const addcountry = await axios.post(
                'https://api.medcollapp.com/api/hospital/update/'+ id,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Hospital Added')
            window.location.reload()
            return JSON.stringify(addcountry?.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 700, fontSize: 20, color: '#000' }}>{"Update Hospital"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#000', }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack direction='row' gap='20px'>
                            <Stack spacing={2} direction='column' >
                                <TextField value={formValues.hospitalName} name="hospitalName" className={classes.textField} id="outlined-basic" type='text' label="Hospital Name" variant="outlined" size="small" onChange={handleChange} />

                                <TextField value={formValues.StateShortName} name="StateShortName" className={classes.textField} id="outlined-basic" type='text' label="State Short Name" variant="outlined" size="small" onChange={handleChange} />

                                {/* <select id="dropdown" onChange={(e) => handlecountry(e)} style={{ height: '37px' }}>
                                    <option value="N/A">Select Country</option>
                                    {allCountries.map((item, index) => (<option value={item.id} key={index.id} >{item.name}</option>))}
                                </select>

                                <select id="dropdown" value={state} onChange={(e) => setState(e.target.value)} style={{ height: '37px' }}>
                                    <option value="N/A">Select State</option>
                                    {allStates.map((item, index) => (<option value={item.id} key={index.id} >{item.name}</option>))}
                                </select> */}

                                <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="languageCode" variant="outlined" size="small" onChange={handleChange} />

                                <TextField value={formValues.hospitalCity} name="hospitalCity" className={classes.textField} id="outlined-basic" type='text' label="Hospital City" variant="outlined" size="small" onChange={handleChange} />

                                <TextField value={formValues.hospitalPostalCode} name="hospitalPostalCode" className={classes.textField} id="outlined-basic" type='text' label="postal code" variant="outlined" size="small" onChange={handleChange} />

                            </Stack>
                            <Stack spacing={2} direction='column'>
                                <TextField value={formValues.hospitalAddress} name="hospitalAddress" className={classes.textField} id="outlined-basic" type='text' label="Address" variant="outlined" size="small" onChange={handleChange} />


                                <TextField id="uhospitalPhotos" className={classes.textField} value={formValues.hospitalPhotos} name="hospitalPhotos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} inputProps={{ accept: 'image/*' }} InputLabelProps={{ shrink: true }} />

                                <TextField id="uhospitalLogo" className={classes.textField} value={formValues.hospitalLogo} name="hospitalLogo" type='file' label="Logo" variant="outlined" size="small" onChange={handleChange} inputProps={{ accept: 'image/*' }} InputLabelProps={{ shrink: true }} />

                                <TextField id="uhospitalBannerImage" className={classes.textField} value={formValues.hospitalBannerImage} name="hospitalBannerImage" type='file' label="Banner Image" variant="outlined" size="small" onChange={handleChange} inputProps={{ accept: 'image/*' }} InputLabelProps={{ shrink: true }} />

                                <TextField value={formValues.hospitaltags} name="hospitaltags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />



                            </Stack>
                        </Stack>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={() => handleSubmit(formValues)} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
                                    Update
                                </Button>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    btn: {
        backgroundColor: '#2C7FB2 !important',
        color: '#fff !important',
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px',
        textTransform: 'none !important'
    },
    textField: {
        width: '300px'
    }

}));
