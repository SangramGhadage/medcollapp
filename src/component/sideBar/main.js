import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Drawer, Divider, Menu, MenuItem, ListItem, ListItemIcon, ListItemText, List, IconButton, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import logoPng from '../../assests/mainlogo.png'
import Navbar from './index'

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        // backgroundColor: 'transparent',
        boxShadow: 'none !important'
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    menuButton: {
        marginRight: 36,
        color: '#00A7EE',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        fontWeight: 400,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: 'transparent',
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
        color: '#fff'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
        backgroundColor: 'transparent',
        color: '#fff'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        fontFamily: '"Poppins", san-serif;',
        fontStyle: 'normal',
        fontWeight: 400,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    appName: {
        // flexGrow: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
        flex: 1,
        textAlign: 'start',
        color: '#00A7EE',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    paper: {
        padding: theme.spacing(1),
        color: '#78B088',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 800,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    report: {
        justifyContent: 'center',
        color: '#78B088',
        fontFamily: '"San Francisco", Helvetica, Arial, san-serif;',
        fontWeight: 'bold'
    },
    grid: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }
}));

export default function SideBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const [anchorElProfile, setAnchorElProfile] = React.useState(false);
    const navigate = useNavigate();


    const handleMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElProfile(true);
        navigate("/#");
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogOut = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        navigate('/')
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
                <Toolbar style={{justifyContent:'end'}}>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open1}
                        onClose={handleClose}
                    >
                    </Menu> */}
                    {/* <div className={classes.appName}>
                        <img src={logoPng} alt="logo" className={classes.logo} height='40px' style={{ flex: 1 }} />
                    </div> */}
                    {auth && (
                        <div className={classes.profile}>
                            <LogoutIcon onClick={handleLogOut} style={{backgroundColor: '#dc3545', color: '#fff', fontSize: '44px', padding: '12px', borderRadius: '4px', marginLeft: '0%', cursor: 'pointer'}}/>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
            <div style={{position: 'fixed'}}
                variant="permanent"
                // className={clsx(classes.drawer, {
                //     [classes.drawerOpen]: open,
                //     [classes.drawerClose]: !open,
                // })}
                // classes={{
                //     paper: clsx({
                //         [classes.drawerOpen]: open,
                //         [classes.drawerClose]: !open,
                //     }),
                // }}
            >
                <div  style={{ color: '#fff' }}>
                    <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
                        {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <CloseIcon />} */}
                        <img src={logoPng} alt="logo" className={classes.logo} height='50px' style={{ flex: 1 }} />
                    </IconButton>
                </div>
                
                {/* <Divider /> */}
                <List style={{width: '250px'}} onMouseOver={handleDrawerOpen}>
                   
                    <Navbar/>
                </List>

            </div>
        </div>
    );
}
