
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Slide, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Stack } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddState({ show, data, handleclose }) {

    const classes = useStyles();
    const navigate = useNavigate();

    const initialValues = { stateName: "", StateShortName: "", languageCode: "", vectorIcone: [], photos: [], bannerImage: [], tags: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const [maxWidth, setMaxWidth] = React.useState('md');

    const handleAdd = async () => {
        var token = window.localStorage.getItem("token");
        const id = data
        console.log(id)
        const vectorIcon = document.querySelector("#vectorIcon");
        const bannerImage = document.querySelector("#bannerImage");
        const photos = document.querySelector("#photos");

        var formData = new FormData();
        formData.append('country_id', id);
        formData.append('name', formValues.stateName);
        formData.append('state_shortname', formValues.StateShortName);
        formData.append('language_code', formValues.languageCode);
        formData.append('tags', formValues.tags);
        formData.append('banner_image', bannerImage.files[0]);
        formData.append('photos[]', photos.files[0]);
        formData.append('vactor_icon', vectorIcon.files[0]);

        try {
            const addState = await axios.post(
                'https://api.medcollapp.com/api/states/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('state added successfull')
            window.location.reload()
            return JSON.stringify(addState?.data);

        } catch (error) {
            alert(error.response.data.message);
        }
        console.log(formValues.stateName)
    }

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
                            <Typography style={{ color: '#000' }} variant='h5'>Add State</Typography>
                            <CloseIcon onClick={handleclose} style={{ color: '#000', cursor: 'pointer' }} />
                        </Stack>
                        <Divider />
                        <Stack direction='row' spacing={3} gap='10px' sx={{ mb: '20px', mt: '20px' }} >
                            <TextField value={formValues.stateName} name="stateName" className={classes.textField} id="outlined-basic" type='text' label="State Name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.StateShortName} name="StateShortName" className={classes.textField} id="outlined-basic" type='text' label="State Short Name" variant="outlined" size="small" onChange={handleChange} />

                            <TextField value={formValues.languageCode} name="languageCode" className={classes.textField} id="outlined-basic" type='text' label="languageCode" variant="outlined" size="small" onChange={handleChange} />

                        </Stack>

                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <TextField id="vectorIcon" className={classes.textField} value={formValues.vectorIcone} name="vectorIcone" type='file' label="Vactor icon" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <TextField id="bannerImage" className={classes.textField} value={formValues.bannerImage} name="bannerImage" type='file' label="Banner Image" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <TextField id="photos" className={classes.textField} value={formValues.photos} name="photos" type='file' label="Photos" variant="outlined" size="small" onChange={handleChange} accept="image/*" InputLabelProps={{ shrink: true }} />

                        </Stack>
                        <Stack spacing={2} direction='column' sx={{ mt: '20px' }}>

                            <TextField value={formValues.tags} name="tags" className={classes.textField} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" onChange={handleChange} />
                        </Stack>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={handleAdd} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
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

// export default editState

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
        textTransform: 'none !important',
        marginTop: 10,
        fontSize: '12px'
    },
    textField: {
        // width: '300px'
    }

}));