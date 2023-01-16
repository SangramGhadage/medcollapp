import React, { useState, useEffect } from 'react'
import Navbar from '../sideBar/main'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Tooltip } from "@material-ui/core";
import { Box, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import DeleteHospital from './deleteHospital';
import AddHospital from './addHospital';
import UpdateHospital from './updateHospital';

const drawerWidth = 260;

export default function Hospital() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [allHospitals, setAllHospitals] = useState([]);
  const [hospital, setHospital] = useState('')
  const [openDeleteHospitalmodal, SetOpenDeleteHospitalmodal] = useState(false);
  const [openUpdateHospitalmodal, SetOpenUpdateHospitalmodal] = useState(false);
  const [openAddHospitalmodal, SetOpenAddHospitalmodal] = useState(false);


  const hospitals = async () => {
    var token = window.localStorage.getItem("token");
    try {
      const response = await axios.get('https://api.medcollapp.com/api/hospitals',
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      setAllHospitals(response?.data?.data)
    }
    catch (error) {
      return (error.response.data.message)
    }
  }
  console.log(allHospitals)

  useEffect(() => {
    hospitals();
  }, [])

  const handleDeleteModal = (e, index) => {
    setHospital(index)
    SetOpenDeleteHospitalmodal(true)
  }
  const handleUpdateModal = (e, index) => {
    setHospital(index)
    SetOpenUpdateHospitalmodal(true)
  }

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
            margin: '79px 3% 2% 248px',
            padding: '2%',
            borderRadius: '0 15px',
          }}
        >
          <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '0 30px 10px 30px' }}>
            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', mt: '20px' }}>
              <Typography variant='h5'>Hospitals Master</Typography>
              <Button
                size="small"
                style={{ marginLeft: 10, }}
              onClick={() => {
                SetOpenAddHospitalmodal(true)
              }}
              >
                <Tooltip title="Add New Hospital" placement="top-start">
                  <ControlPointOutlinedIcon style={{ color: '#fff', borderRadius: '50%', fontSize: '2rem', backgroundColor: '#004dda' }} />
                </Tooltip>
              </Button>
            </Stack>
            <Grid container direction='row' spacing={3}>

              {allHospitals.map((item, index) => (
                <Grid key={index.id} item xs={3}>
                  <Box sx={{height: '100%', width: '100%', padding: '8px', borderRadius: '22px', boxShadow: '0px 4px 12px rgba(166, 166, 166, 0.25)', marginBottom: '10px'}}>
                  <div style={{ width: '100%' }}>

                  <img src={item.logo} alt="" style={{ width: '100%',height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
                  </div>
                  <Typography variant='h5'>{item.name}</Typography>
                  <Stack direction= 'row' spacing={2}>
                    <LocationOnIcon/>
                    <Typography variant='h6'>{item.address}</Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-around'>
                    <Button sx={{backgroundColor: '#2C7FB2 !important',width: 100, color: '#fff !important',borderRadius: 28, textTransform: 'none !important',}} onClick={(e) => handleDeleteModal(e, item)}>Delete</Button>

                    <Button sx={{backgroundColor: '#2C7FB2 !important',width: 100, color: '#fff !important',borderRadius: 28, textTransform: 'none !important',}} onClick={(e) => handleUpdateModal(e, item)}>Update</Button>
                  </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {openAddHospitalmodal ? <AddHospital show={openAddHospitalmodal} handleclose={() => SetOpenAddHospitalmodal(false)} /> : null}

          {openDeleteHospitalmodal ? <DeleteHospital hospital={hospital} show={openDeleteHospitalmodal} handleclose={() => SetOpenDeleteHospitalmodal(false)} /> : null}
          
          {openUpdateHospitalmodal ? <UpdateHospital hospital={hospital} show={openUpdateHospitalmodal} handleclose={() => SetOpenUpdateHospitalmodal(false)} /> : null}
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
