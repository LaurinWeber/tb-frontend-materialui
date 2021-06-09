import { makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react'
import { Drawer, Topography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { useHistory, useLocation } from 'react-router-dom';
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
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        toolLeft: {
            flexGrow: 1,
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Accounts',
            icon: <PeopleAltOutlinedIcon color={"secondary"} />,
            path: '/'

        },
        {
            text: 'Groups',
            icon: <LocalOfferOutlinedIcon color={"secondary"} />,
            path: '/accounts'

        }
    ]

    return (
        <div className={classes.root}>
            {/*app bar*/}
            <AppBar className={classes.appbar} elevation={0} color={"white"}>
                <Toolbar>
                    <Typography className={classes.toolLeft}> 
                        
                    </Typography>
                    <Typography> 
                        Laurin
                    </Typography>
                    <Avatar src="" className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            {/*side drawer*/}
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
                    {menuItems.map(item => (
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
