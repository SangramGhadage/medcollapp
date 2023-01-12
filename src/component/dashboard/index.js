import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Tooltip } from "@material-ui/core";
import { Box, Stack } from '@mui/material';
import Navbar from '../sideBar/main'


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={classes.root} style={{}}>
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
              <Typography variant='h5'>Welcome to Dashboard</Typography>

            </Stack>
          </Box>
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
  // grid: {
  //     overflow: 'hidden',
  //     whiteSpace: 'nowrap',
  //     textOverflow: 'ellipsis',
  //     // margin: '70px 0 20px 25px'
  // },
  // gridShift: {
  //     marginLeft: drawerWidth,
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     transition: theme.transitions.create(['width',], {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.enteringScreen,
  //     }),
  // },


}));
