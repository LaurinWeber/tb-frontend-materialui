import React from 'react'
import { makeStyles } from '@material-ui/core'
import Footer from '../../components/Footer';

//CSS styling => material ui style
const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: '0',
            marginTop: '65px',
            maxWidth: '100%',
            width: '100vw',
        },
        body: {
            minHeight: 'calc(100vh - 140px)',
            margin: 0,
            padding: 0,
            maxWidth: '100%',
            width: '100vw',
        },
    }
})

//payment component
export default function Payment() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                Payment
            </div>
            <Footer />
        </div>
    )
}
