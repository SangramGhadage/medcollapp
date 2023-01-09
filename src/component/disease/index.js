import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Typography, Button, Tooltip } from "@material-ui/core";
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

import AddDisease from './addDisease';
import Navbar from '../sideBar/main'

const drawerWidth = 260;

export default function Disease() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [allDiseases, setAllDiseases] = useState([]);
  const [openAddDiseasemodal, SetOpenAddDiseasemodal] = useState(false);
  const [allCountries, setAllCountries] = useState([]);


  const disease = async () => {
    var token = window.localStorage.getItem("token");
    try {
      const response = await axios.get('https://api.medcollapp.com/api/diseases',
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      setAllDiseases(response?.data?.data)
    }
    catch (error) {
      return (error.response.data.message)
    }
  }

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
      setAllCountries(response?.data?.data)
    }
    catch (error) {
      return (error.response.data.message)
    }
  };

  useEffect(() => {
    disease();
    countries()
  }, [])

  return (
    <>
      <div className={classes.root}>
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
          <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '0 30px 10px 30px' }}>
            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', }}>
              <Typography variant='h5'>Disease</Typography>
              <Button
                size="small"
                style={{ marginLeft: 10, }}
                onClick={() => {
                  SetOpenAddDiseasemodal(true)
                }}
              >
                <Tooltip title="Add New Disease" placement="top-start">
                  <ControlPointOutlinedIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#004dda' }} />
                </Tooltip>
              </Button>
            </Stack>
          </Box>
          {openAddDiseasemodal ? <AddDisease data={allCountries} show={openAddDiseasemodal} handleclose={() => SetOpenAddDiseasemodal(false)} /> : null}
        </Grid>
      </div>
    </>
  )
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

}));
