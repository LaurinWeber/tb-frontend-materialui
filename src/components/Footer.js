import React from 'react'
import { Grid, Typography, IconButton, makeStyles } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => {
    return {
        footer: {
            height: 'auto',
            margin: 0,
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            maxWidth: '100%',
            width: '100vw',
        },
        textFooter: {
            paddingTop: theme.spacing(1),
        },
    }
})

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.footer}>
            <Grid item xs={12} sm={4} >
                <Typography variant={"subtitle1"} align={"left"} className={classes.textFooter}>
                    © RideOnGmbH 2021
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Typography variant={"subtitle1"} align={"center"} className={classes.textFooter}>
                    hello@enjoytheride.fun | 079 923 33 99
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4} align={"right"}>
                <IconButton onClick={() => window.open('https://www.instagram.com/enjoytheride.fun/')}>
                    <InstagramIcon />
                </IconButton>
                <IconButton onClick={() => window.open('https://www.facebook.com')}>
                    <FacebookIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}
