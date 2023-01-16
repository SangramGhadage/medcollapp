
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Slide, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, TextField } from "@material-ui/core";
import { Stack } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditCountry = ({ show, data, handleclose }) => {
    // console.log(data)
    const classes = useStyles();
    const navigate = useNavigate();

    const [maxWidth, setMaxWidth] = React.useState('md');

    const initialValues = {
        countryName: data ? data.name : '',
        countryCode: data ? data.country_code : '',
        languageCode: data ? data.language_code : '',
        currencyCode: data ? data.currency_code : '',
        currencySymbol: data ? data.currency_symbol : '',
        vectorIcone: '',
        photos: '',
        bannerImage: '',
        tags: data ? data.tags : '',
        currencyName: data ? data.currency_name : ''
    }
    const [formValues, setFormValues] = useState(initialValues);
    // console.log(data.photos)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    console.log(formValues)
    const handleEditCountry = async () => {
        var token = window.localStorage.getItem("token");
        let id = data.id

        const vectorIcon = document.querySelector("#UCvectorIcon");
        const bannerImage = document.querySelector("#UCbannerImage");
        const photos = document.querySelector("#UCphotos");

        var formData = new FormData();
        if (formValues.bannerImage !== '') {
            formData.append('banner_image', bannerImage.files[0]);

        }
        if (formValues.photos !== '') {
            formData.append('photos', photos.files[0]);
        }
        if (formValues.vectorIcone !== '') {
            formData.append('vactor_icon', vectorIcon.files[0]);
        }
        formData.append('country_code', formValues.countryCode);
        formData.append('currency_code', formValues.currencyCode);
        formData.append('currency_name', formValues.currencyName);
        formData.append('currency_symbol', formValues.currencySymbol);
        formData.append('language_code', formValues.languageCode);
        formData.append('name', formValues.countryName);
        formData.append('tags', formValues.tags);

        axios.post('https://api.medcollapp.com/api/country/update/' + id, formData,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )
            .then(res => {
                console.log(res?.data?.data)
                alert(res.data.message);
                window.location.reload();
                return JSON.stringify(res.data.data);
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 700, fontSize: 20, color: '#000' }}>{"Edit Country"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#000', }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            <Stack direction='row' spacing={3} gap= '10px' sx={{mb: '20px'}}>
                                <TextField style={{width: '545px'}} value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country Name" variant="outlined" size="small" onChange={handleChange} />

                                <TextField style={{width: '300px'}} value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />
                            </Stack>
                            <Stack direction='row' spacing={2} gap='10px'  sx={{mb: '20px'}}>

                                <TextField style={{width: '200px'}} value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />

                                <TextField style={{width: '200px'}}  value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />

                                <TextField style={{width: '200px'}}  value={formValues.currencyCode} name="currencyCode" className={classes.textField} id="outlined-basic" type='text' label="currency Code" variant="outlined" size="small" onChange={handleChange} />

                                <TextField style={{width: '200px'}} value={formValues.currencySymbol} name="currencySymbol" className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" onChange={handleChange} />
                            </Stack>
                        
                            <Stack direction='column' spacing={2} gap='10px' width= '100%' sx={{mb: '20px'}}>

                                <img style={{width: '100px'}} src={data.vactor_icon}/>
                                <TextField style={{width: '100%'}} className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" id="UCvectorIcon" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                            </Stack>
                            <Stack direction='column' spacing={2} gap='10px' width= '100%' sx={{mb: '20px'}}>

                            <img style={{width: '100px'}} src={data.photos}/>
                                <TextField style={{}} value={formValues.photos} name="photos" className={classes.textField} id="UCphotos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />

                            </Stack>
                            <Stack direction='column' spacing={2} gap='10px' width= '100%' sx={{mb: '20px'}}>

                            <img style={{width: '300px'}} src={data.banner_image}/>
                                <TextField style={{}} value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="UCbannerImage" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />

                            </Stack>
                            <Stack direction='column' spacing={2} gap='10px' width= '100%' sx={{mb: '20px'}}>

                                <TextField style={{}} value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />

                            </Stack>
                      
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={handleEditCountry} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default EditCountry

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
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        textTransform: 'none !important',
        fontSize: '12px',
        textTransform: 'none !important',
    },
    textField: {
        // width: '300px',
    },

}));