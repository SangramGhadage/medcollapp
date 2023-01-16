import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Typography, Tooltip } from "@material-ui/core";
import { Box, Stack, Button } from '@mui/material';
import axios from 'axios';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

import Navbar from '../sideBar/main'
import AddDisease from './addDisease';
import DeleteDisease from './deleteDisease';
import UpdateDisease from './updateDisease';

const drawerWidth = 260;

export default function Disease() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [allDiseases, setAllDiseases] = useState([]);
  const [openAddDiseasemodal, SetOpenAddDiseasemodal] = useState(false);
  const [openDeleteDiseasemodal, SetOpenDeleteDiseasemodal] = useState(false);
  const [openUpdateDiseasemodal, SetOpenUpdateDiseasemodal] = useState(false);
  const [disease, setDisease] = useState('')

  const diseases = async () => {
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
  const handleDeleteModal = (e, index) => {
    console.log(index)
    setDisease(index)
    SetOpenDeleteDiseasemodal(true)
  }
  const handleUpdateModal = (e, index) => {
    setDisease(index)
    SetOpenUpdateDiseasemodal(true)
  }

  useEffect(() => {
    diseases();
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
            margin: '79px 1% 2% 248px',
            padding: '2%',
            borderRadius: '0 15px',
          }}
        >
          <Box sx={{ width: '100%', backgroundColor: '#fff3', boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)', borderRadius: '5px', padding: '0 30px 10px 30px' }}>
            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%', mt: '10px' }}>
              <Typography variant='h5'>Disease Master</Typography>
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
            <Grid container direction='row' spacing={3}>

              {allDiseases.map((item, index) => (
                <Grid key={index.id} item xs={3}>
                  <Box sx={{ height: '100%', width: '100%', padding: '8px', borderRadius: '22px', boxShadow: '0px 4px 12px rgba(166, 166, 166, 0.25)', marginBottom: '10px' }}>
                    <div style={{ width: '100%' }}>
                      <img src={item.icon_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
                    </div>
                    <Typography variant='h5'>{item.name}</Typography>
                    <Stack direction='row' justifyContent='space-around' alignItems='end'>
                      <Button sx={{ backgroundColor: '#2C7FB2 !important', width: 100, color: '#fff !important', borderRadius: 28, textTransform: 'none !important', }} onClick={(e) => handleDeleteModal(e, item)}>Delete</Button>

                      <Button sx={{ backgroundColor: '#2C7FB2 !important', width: 100, color: '#fff !important', borderRadius: 28, textTransform: 'none !important', }} onClick={(e) => handleUpdateModal(e, item)}>Update</Button>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {openAddDiseasemodal ? <AddDisease show={openAddDiseasemodal} handleclose={() => SetOpenAddDiseasemodal(false)} /> : null}

          {openDeleteDiseasemodal ? <DeleteDisease disease={disease} show={openDeleteDiseasemodal} handleclose={() => SetOpenDeleteDiseasemodal(false)} /> : null}

          {openUpdateDiseasemodal ? <UpdateDisease disease={disease} show={openUpdateDiseasemodal} handleclose={() => SetOpenUpdateDiseasemodal(false)} /> : null}
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
