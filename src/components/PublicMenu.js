import { makeStyles, IconButton, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Drawer, Topography, Menu, MenuItem, Dialog, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import App from '../App';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {

    return {
        pageShift: {
            background: '#f7f7f7',
            width: '100%',
            padding: theme.spacing(3),
            marginLeft: -drawerWidth
        },
        page: {
            background: '#f7f7f7',
            width: '100%',
            padding: theme.spacing(3),
        },
        menuItem:{
            padding: 10,
            marginRight: 30
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth,
            paddingTop: 64
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f3f3f3f3'
        },
        title: {
            padding: theme.spacing(3),
            flexGrow: 1,
        },
        appbar: {
            zIndex: theme.zIndex.drawer + 1
        },
        right: {
            display: 'flex',
            alignContent: 'left'

        },
    }
})

export default function PublicMenu({ children}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        console.log("Public-Mount")
        return () => {
            console.log("Un-Mount")
        }
    }, [])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShowCart = () => {
        setShowCart(!showCart);
    }

    const handleLogin = () => {
        history.push('/login')
        setAnchorEl(null);
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
            <MenuItem onClick={handleLogin}>Login</MenuItem>
        </Menu>
    );
    return (
        <div className={classes.root}>
            {/*app bar*/}
            <AppBar className={classes.appbar} elevation={0} color={"secondary"}>
                <Toolbar>
                    <Typography className={classes.title} onClick={() => history.push('/')}>
                        EnjoyTheRide
                    </Typography>
                    <div className={classes.right}>
                        <IconButton
                            className={classes.menuItem}
                            edge="start"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={
                                handleShowCart
                            }
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton
                            className={classes.MenuItem}
                            edge="start"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={
                                handleProfileMenuOpen
                            }
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {showCart &&
                <Drawer
                    className={classes.drawer}
                    variant={'permanent'}
                    anchor='right'
                    classes={{ paper: classes.drawerPaper }}
                >
                    <Typography variant='h5' className={classes.title}>
                        Cart
                    </Typography>

                    {/* In future must be a card comp */}

                </Drawer>
            }
            {renderMenu}
            <div className={showCart ? classes.pageShift : classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}
