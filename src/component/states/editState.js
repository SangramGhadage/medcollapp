
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Slide, Dialog, TextField, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditState({ show, data, handleclose }) {

    const initialValues = { stateName: data ? data.name : '', StateShortName: data ? data.state_shortname : '', languageCode: data ? data.language_code : '', vectorIcone: '', photos: '', bannerImage: '', tags: data ? data.tags : '' }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const classes = useStyles();
    const navigate = useNavigate();

    const [maxWidth, setMaxWidth] = React.useState('md');


    const handleEdit = async () => {
        var token = window.localStorage.getItem("token");
        let id = data.id
        console.log(id)

        const vectorIcon = document.querySelector("#vectorIcon");
        const bannerImage = document.querySelector("#bannerImage");
        const photos = document.querySelector("#photos");

        var formData = new FormData();
        formData.append('name', formValues.stateName);
        formData.append('state_shortname', formValues.StateShortName);
        formData.append('language_code', formValues.languageCode);
        formData.append('tags', formValues.tags);
        if (formValues.bannerImage !== '') {
            formData.append('banner_image', bannerImage.files[0]);
        }
        if (formValues.photos !== '') {

            formData.append('photos[]', photos.files[0]);
        }
        if (formValues.vectorIcone !== '') {

            formData.append('vactor_icon', vectorIcon.files[0]);
        }
        axios.post('https://api.medcollapp.com/api/states/update/' + id, formData,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )
            .then(res => {

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
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack direction='row' justifyContent='space-between' sx={{ mb: '10px' }}>
                            <Typography style={{ color: '#000' }} variant='h5'>Edit State</Typography>
                            <CloseIcon onClick={handleclose} style={{ color: '#000', cursor: 'pointer' }} />
                        </Stack>
                        <Divider />
                        <Stack direction='row' spacing={3} gap='10px' sx={{ mb: '20px' }} >
                            <TextField value={formValues.stateName} name="stateName" className={classes.textField} id="outlined-basic" type='text' label="State Name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.StateShortName} name="StateShortName" className={classes.textField} id="outlined-basic" type='text' label="State Short Name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="languageCode" variant="outlined" size="small" onChange={handleChange} />

                        </Stack>

                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <img style={{ width: '100px' }} src={data.vactor_icon} />
                            <TextField id="vectorIcon" style={{ width: '100%' }} className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <img style={{ width: '300px' }} src={data.banner_image} />
                            <TextField id="bannerImage" className={classes.textField} value={formValues.bannerImage} name="bannerImage" type='file' label="Banner Image" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <img style={{ width: '100px' }} src={data.photos} />
                            <TextField id="photos" className={classes.textField} value={formValues.photos} name="photos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack sx={{ mt: '10px' }}>
                            <TextField value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>

                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={handleEdit} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
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

// export default editState

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
        textTransform: 'none !important',
        width: 120,
        marginTop: 10,
        fontSize: '12px'
    },
    textField: {
        // width: '300px'
    }

}));