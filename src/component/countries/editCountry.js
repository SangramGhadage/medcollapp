
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Slide, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, TextField } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditCountry = ({ show, data, handleclose }) => {
    console.log(data)
    const classes = useStyles();
    const navigate = useNavigate();

    const [maxWidth, setMaxWidth] = React.useState('md');

    const initialValues = { countryName: "", countryCode: "", languageCode: "", currencyCode: "", currencySymbol: "", vectorIcone: [], photos: [], bannerImage: [], tags: "", currencyName: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // const file = e.target.files;
        // setVectorIcon(file)
    }

    const handleEditCountry = async () => {
        var token = window.localStorage.getItem("token");
        let id = data.id
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
            const editCountry = await axios.post('https://api.medcollapp.com/api/country/update/'+ id, object,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            return JSON.stringify(editCountry?.data);
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    }
    useEffect(() => {

    }, [])

    return (
        <>
            <Dialog
                open={show}
                maxWidth={maxWidth}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20, color: '#2C7FB2' }}>{"Edit Country"}
                    <IconButton edge="start" color="inherit" onClick={handleclose} aria-label="close" style={{ float: 'right', color: '#2C7FB2', backgroundColor: '#F0F0F0' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField value={formValues.countryName} name="countryName" className={classes.textField} id="outlined-basic" type='text' label="Country" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField value={formValues.countryCode} name="countryCode" className={classes.textField} id="outlined-basic" type='text' label="Country Code" variant="outlined" size="small" onChange={handleChange} />


                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="Language Code" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField value={formValues.currencySymbol} name="currencySymbol" className={classes.textField} id="outlined-basic" type='text' label="Currency Symbol" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" id="outlined-basic" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField style={{ marginTop: '10px' }} value={formValues.photos} name="photos" className={classes.textField} id="outlined-basic" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField style={{ marginTop: '10px' }} value={formValues.bannerImage} name="bannerImage" className={classes.textField} id="outlined-basic" type='file' label="Banner image" variant="outlined" size="small" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField style={{ marginTop: '10px' }} value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <center>
                                    <div style={{ paddingTop: 10 }}>
                                        <TextField style={{ marginTop: '10px' }} value={formValues.currencyName} name="currencyName" className={classes.textField} id="outlined-basic" type='text' label="Currency name" variant="outlined" size="small" onChange={handleChange} />
                                    </div>
                                </center>
                            </Grid>
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
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },
    inputFields: {
        width: 300,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 200,
        marginBottom: 20
    },

}));