import React from 'react'
import { Button, makeStyles, Paper, Grid, Typography, Icon } from '@material-ui/core';
import HeroSvg from '../../assets/img/hero.svg'
import Footer from '../../components/Footer';
import { useHistory } from 'react-router-dom';

//CSS styling => material ui style
const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: 'auto',
            marginTop: '65px',
            margin: 0,
            padding: 0,
            maxWidth: '100%',
            width: '100vw',

        },
        wrapper: {
            height: 'auto',
            marginTop: 0,
            margin: 0,
            padding: 0,
            maxWidth: '100%',
            width: '100vw',

        },
        itemService: {
            margin: 0,
            padding: 0,
        },
        itemHero: {
            margin: 0,
            padding: 20,
            height: '50vh',
        },
        itemWrapper: {
            paddingTop: 60,
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            margin: 0,
            maxWidth: '100%',
            width: '100vw',
            height: 'calc(120vh - 65px)',
            background: '#ffffff'
        },
        img: {
            maxHeight: '70vh'
        },
        callToAction: {
            marginTop: '20vh',
            height: 'auto'
        },
        button: {
            marginTop: 20,
            marginLeft: 40,
            marginRight: 40,
        }
    }
})

//home components
function Home() {
    const classes = useStyles();
    const history = useHistory();
    return (

        <div className={classes.root}>
            {/*Hero section */}
            <Grid container spacing={3} className={classes.itemWrapper}>
                <Grid item xs={12} sm={6} align={"center"} className={classes.callToAction}>
                    <Typography variant={"h3"} align={"center"} className={classes.button}>
                        Ski - Lesson
                    </Typography>
                    <Typography variant={"subtitle1"} align={"center"} className={classes.button}>
                        Lorem ipsum dolor sit amet, vix dicat mundi phaedrum te, ea cibo legimus repudiandae vim. In vim doctus sensibus. Ad nulla consetetur pro, an nusquam deleniti has. Ne ipsum iisque expetendis mea. Cu melius vituperata pro.
                    </Typography>
                    <Button
                        type='submit'
                        color='secondary'
                        variant="contained"
                        className={classes.button}
                        onClick={
                            () => history.push('/booking')
                        }
                    >
                        Private
                    </Button>
                    <Button
                        type='submit'
                        color='secondary'
                        variant='outlined'
                        align={"right"}

                        className={classes.button}>
                        Group
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} align={"center"} >
                    <img src={HeroSvg} className={classes.img}></img>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default Home
