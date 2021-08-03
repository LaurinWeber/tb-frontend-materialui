import { makeStyles, IconButton, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Drawer, Topography, Divider, Menu, MenuItem, Button, AppBar, Toolbar, Avatar, Grid } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from "../assets/img/logo_black.png"

const drawerWidth = 500
/*Styling */
const useStyles = makeStyles((theme) => {

    return {
        pageShift: {
            background: "#ffffff",
            width: '100%',
            margin: 0,
            padding: 0,
            marginLeft: -drawerWidth
        },
        page: {
            background: "#ffffff",
            width: '100%',
            margin: 0,
            padding: 0,
        },
        menuItem: {
            padding: 0,
            marginRight: 30
        },
        drawer: {
            width: drawerWidth,
            paddingBottom: 100,
        },
        drawerPaper: {
            width: drawerWidth,
            paddingTop: 64,
            paddingBottom: 100,
            marginBottom: 100,
        },
        root: {
            margin: 0,
            padding: 0,
            display: 'flex'
        },
        active: {
            background: '#ffffff'
        },
        left: {
            paddingLeft: theme.spacing(5),
            flexGrow: 1,
        },
        appbar: {
            zIndex: theme.zIndex.drawer + 1,
            height: '65px',
            margin: 0,
            padding: 0
        },
        toolbar: {
            margin: 0,
            padding: 0
        },
        right: {
            display: 'flex',
            alignContent: 'left',
            paddingRight: theme.spacing(5),

        },
        content: {
            marginBottom: 160,
        },
        wrapper: {
            paddingTop: 20,
            marginBottom: 20
        },
        item: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20
        },
        cartTitle: {
            margin: 20,
            paddingLeft: 15,
        },
        divider: {
            marginLeft: 10,
            marginRight: 10,
        },
        total:{
            padding: 35,
        },
        img: {
            height: "50px",
            width: "auto"
        }
    }
})

/*public menu component */
export default function PublicMenu({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);//get position for logout button
    const isMenuOpen = Boolean(anchorEl); //set the logout button menu
    const [showCart, setShowCart] = useState(false);//state with boolean value that when set true shows the cart on the right
    const [showCheckOutButton, setShowCheckOutButton] = useState(true); //state value defines if check out button was clicked

/*login button clicked, open menu */
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //after login button click the buttons location is set to null, that it disappears
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //toggle button
    const handleShowCart = () => {
        setShowCart(!showCart);
    }

    //after login change route
    const handleLogin = () => {
        history.push('/login')
        setAnchorEl(null);
    }

    //on check out change route
    const handleCheckOut = () => {
        //setShowCheckOutButton(!showCheckOutButton);
        history.push("/payment")
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
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                    <img src={logo} className={classes.img} onClick={() => history.push('/')}></img>
                    </div>
                    <div className={classes.right}>
                        <IconButton
                            className={classes.menuItem}
                            edge="start"
                            aria-haspopup="true"
                            color="primary"
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
                            color="primary"
                            onClick={
                                handleProfileMenuOpen
                            }
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {/*Show cart on cart click, right drawer */}
            {showCart &&
                <Drawer
                    className={classes.drawer}
                    variant={'permanent'}
                    anchor='right'
                    classes={{ paper: classes.drawerPaper }}
                >
                    <Typography variant='h2' className={classes.cartTitle}>
                        Cart
                    </Typography>
                    <Divider className={classes.divider} />
                    {/*some data to give an example how content can be arranged */}
                    <div className={classes.content}>
                        <Grid container xs={12} className={classes.wrapper}>
                            <Grid item xs={12} className={classes.item}>
                                Cart Item
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container spacing={5} className={classes.total}>
                            <Grid item xs={6} >
                                <Typography variant={"h4"}>Total:</Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant={"h4"}>2'900CHF</Typography>
                            </Grid>
                            {showCheckOutButton &&
                            <Grid item xs={12} >
                                <Button
                                variant={"contained"}
                                color={"primary"}
                                fullWidth
                                onClick={()=> handleCheckOut()}
                                >
                                    Check out
                                </Button>
                            </Grid>
                            }
                        </Grid>
                    </div>
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
