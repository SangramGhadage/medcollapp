import React,{useState, useEffect} from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Stack, TextField } from '@mui/material';
import axios from 'axios';


export default function AddDisease({ show, handleclose, data }) {
    const classes = useStyles();
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [country, setCountry] = useState('');

    const initialValues = { diseaseName: "", diseaseCatagory: "", diseaseCause: "", diseaseTreatment: "", diseaseResult: "", iconImage: [], slideImage: [], tags: "", diseaseDiscription: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async () => {
        var token = window.localStorage.getItem('token');
        const icon_image = document.querySelector("#icon_image");
        const slide_images = document.querySelector("#slide_images");

        var formData = new FormData();
        formData.append('name', formValues.diseaseName)
        formData.append('category', formValues.diseaseCatagory);
        formData.append('cause', formValues.diseaseCause);
        formData.append('result', formValues.diseaseResult);
        formData.append('treatment', formValues.diseaseTreatment);
        formData.append('icon_image', icon_image.files[0]);
        formData.append('slide_images[]', slide_images.files[0]);
        formData.append('tags', formValues.tags);
        formData.append('description', formValues.diseaseDiscription);

        try {
            const addcountry = await axios.post(
                'https://api.medcollapp.com/api/disease/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Disease Added')
            window.location.reload()
            return JSON.stringify(addcountry?.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        
    }, [])
    console.log(country)
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
                        <Stack direction='row' gap='4px' sx={{ mb: '7px' }}>
                            <TextField sx={{ width: '400px' }} name= 'diseaseName'value= {formValues.diseaseName} onChange={handleChange}  className={classes.textField} id="outlined-basic" type='text' label="Disease Name" variant="outlined" size="small" />

                            <TextField sx={{ width: '400px' }} name= 'diseaseCatagory'value= {formValues.diseaseCatagory} onChange={handleChange}  id="outlined-basic" type='text' label="Catagory" variant="outlined" size="small" />
                        </Stack>
                        <Stack direction='row' gap='4px' sx={{ mb: '7px' }}>
                            <TextField sx={{ width: '400px' }} name= 'diseaseCause'value= {formValues.diseaseCause} onChange={handleChange}  className={classes.textField} id="outlined-basic" type='text' label="Cause" variant="outlined" size="small" />

                            <TextField sx={{ width: '400px' }} name= 'diseaseResult'value= {formValues.diseaseResult} onChange={handleChange}   id="outlined-basic" type='text' label="Result" variant="outlined" size="small" />
                        </Stack>
                        <Stack direction='row' gap='4px' sx={{ mb: '7px' }}>
                            <TextField sx={{ width: '400px' }} name= 'diseaseTreatment'value= {formValues.diseaseTreatment} onChange={handleChange}  className={classes.textField} id="outlined-basic" type='text' label="Treatment" variant="outlined" size="small" />

                            <TextField sx={{ width: '400px' }} name= 'diseaseDiscription'value= {formValues.diseaseDiscription} onChange={handleChange}  id="outlined-basic" type='text' label="Disease Discription" variant="outlined" size="small" />
                        </Stack>
                        <Stack direction='row' gap='4px' sx={{ mb: '7px' }}>
                            <TextField sx={{ width: '400px' }} name= 'iconImage'value= {formValues.iconImage} onChange={handleChange}  className={classes.textField}id="icon_image" type='file' label="Icon Image" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />

                            <TextField  sx={{ width: '400px' }} name= 'slideImage'value= {formValues.slideImage} onChange={handleChange} id="slide_images" type='file' label="Slide Image" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </Stack>
                        <Stack direction='row' gap='4px' sx={{ mb: '7px' }}>

                            <TextField sx={{ width: '400px' }} name= 'tags'value= {formValues.tags} onChange={handleChange} id="outlined-basic" type='text' label="tags" variant="outlined" size="small" />
                        </Stack>
                        <Typography>{country}</Typography>
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
        fontWeight: 700,
        textAlign: 'center',
        borderRadius: 28,
        width: 120,
        marginTop: 10,
        fontSize: '12px',
        textTransform: 'none !important',
    },
    // textField: {
    //     fontFamily: 'Poppins;',
    //     fontStyle: 'normal',
    //     fontWeight: 400,
    //     fontSize: 11,
    //     textAlign: 'center',
    //     // width: '90%',
    // },

}));
