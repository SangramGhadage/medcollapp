import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Slide, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Grid, } from "@material-ui/core";
import axios from 'axios';

export default function DeleteHospital({ show, hospital, handleclose }) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleonDelete = () => {
    var token = window.localStorage.getItem("token");
    let id = hospital.id
    console.log(id)
    
    axios.delete('https://api.medcollapp.com/api/hospital/delete/' + id,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
            console.log(res.data);
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data.message)
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
                        <Grid container>
                            <Grid item xs={12} style={{ textAlign: 'center', }}>
                                <h4>Are you sure you want to delete this Hospital</h4>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.btn} onClick={handleclose} style={{ float: 'right', marginRight: 20 }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={handleonDelete} className={classes.btn} style={{ float: 'left', marginLeft: 20 }}>
                                    Delete
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

}));
