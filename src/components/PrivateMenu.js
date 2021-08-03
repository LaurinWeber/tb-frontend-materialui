import { makeStyles, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Drawer, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/*witdth of the cart drawer */
const drawerWidth = 240

/* styles with theme parameter allows to access theme objects */
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

/*menu items from the private layout, which are displayed in the drawer on the left */
const MENUITEMS = [
    {
        text: 'Profile',
        icon: <AccountCircleIcon color={"primary"} />,
        path: '/profile',
        auth: "employee"
    },
    {
        text: 'Calendar',
        icon: <CalendarTodayIcon color={"primary"} />,
        path: '/calendar',
        auth: "employee"
    },
    {
        text: 'Accounts',
        icon: <PeopleAltOutlinedIcon color={"primary"} />,
        path: '/accounts',
        auth: "admin"
    },
    {
        text: 'Groups',
        icon: <LocalOfferOutlinedIcon color={"primary"} />,
        path: '/groups',
        auth: "admin"
    },
]

export default function PrivateMenu({ children, setIsLoggedIn, setIsAdmin, isAdmin }) {
    const classes = useStyles(); //apply styling
    const history = useHistory(); //needed to change url
    const location = useLocation(); //needed to define where in the menu the user is, to change background color
    const [anchorEl, setAnchorEl] = React.useState(null); //needed to anchor the position of the menu
    const isMenuOpen = Boolean(anchorEl);
    const [menu, setMenu] = useState(MENUITEMS.filter(item => item.auth === 'employee')); //depending on the user show administrator menu 

    //convert the user item stored in the local storage into a JavaScript Object, to display user email in header
    var user = JSON.parse(localStorage.getItem('user'))

    //when admin is changing set the menu
    useEffect(() => {
        //initialize menu
        if (isAdmin) {
            setMenu(MENUITEMS)
        }
        return () => {
            setMenu([]);
        };
    }, [isAdmin])

    //open the menu, at the position where login button was clicked
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //close the menu 
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //remove, and reset values on logout click
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAdmin(false)
        history.push('/')
        setIsLoggedIn(false);
    }

    //render Logout menu button
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

    /* */
    return (
        <div className={classes.root}>
            {/*app bar*/}
            <AppBar className={classes.appbar} elevation={0} color={"primary"}>
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

            {/*Menu, drawer on the left */}
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
            {/* render the childern of the layout wrapper, e.g. calendar */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}
