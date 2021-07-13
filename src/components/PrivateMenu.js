import { makeStyles, IconButton, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Drawer, Topography, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import App from '../App';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {

    return {
        page: {
            background: '#f7f7f7',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f3f3f3f3'
        },
        title: {
            padding: theme.spacing(3)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        toolLeft: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

const MENUITEMS = [
    {
        text: 'Profile',
        icon: <AccountCircleIcon color={"secondary"} />,
        path: '/profile',
        auth: "employee"
    },
    {
        text: 'Calendar',
        icon: <CalendarTodayIcon color={"secondary"} />,
        path: '/calendar',
        auth: "employee"
    },
    {
        text: 'Accounts',
        icon: <PeopleAltOutlinedIcon color={"secondary"} />,
        path: '/accounts',
        auth: "admin"
    },
    {
        text: 'Groups',
        icon: <LocalOfferOutlinedIcon color={"secondary"} />,
        path: '/groups',
        auth: "admin"
    },
]

export default function PrivateMenu({ children, setIsLoggedIn, setIsAdmin, isAdmin }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [menu, setMenu] = useState(MENUITEMS.filter(item => item.auth === 'employee'));

    var user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    useEffect(() => {
        //initialize menu
        if(isAdmin){
            setMenu(MENUITEMS)
        }
        return () => {
            setMenu([]);
          };
    }, [isAdmin])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAdmin(false)
        history.push('/')
        setIsLoggedIn(false);
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleLogout}>Logout</MenuItem>

        </Menu>
    );



    return (
        <div className={classes.root}>
            {/*app bar*/}
            <AppBar className={classes.appbar} elevation={0} color={"secondary"}>
                <Toolbar>

                    <Typography className={classes.toolLeft} variant='h6'>
                        {user.email}
                    </Typography>
                    <IconButton
                        edge="start"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={
                            handleProfileMenuOpen
                        }
                    >

                        <Avatar src="" className={classes.avatar} />
                    </IconButton>

                </Toolbar>
            </AppBar>
            {renderMenu}

            <Drawer
                className={classes.drawer}
                variant={'permanent'}
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <Typography variant='h5' className={classes.title}>
                    EnjoyTheRide
                </Typography>

                {/* list / links */}
                <List>
                    {menu.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon >{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}
