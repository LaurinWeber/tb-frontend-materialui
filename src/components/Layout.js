import { makeStyles, IconButton, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Drawer, Topography, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import App from '../App';
import PrivateMenu from './PrivateMenu';
import PublicMenu from './PublicMenu';

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

export default function Layout({ children, setIsLoggedIn, isLoggedIn, setIsAdmin, isAdmin }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {

        console.log("Layout-Mount")
        console.log("is Logged In", isLoggedIn)
        return () => {
            console.log("Un-Mount")
        }
    }, [])

    return (

        <div>
            {
            isLoggedIn ?
                <PrivateMenu children={children} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
                :
                <PublicMenu children={children} setIsLoggedIn={setIsLoggedIn} />
            }
        </div>
    )
}
