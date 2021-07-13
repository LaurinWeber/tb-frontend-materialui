import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            paddingTop: 80,
        },
    }
})

function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Home
        </div>
    )
}

export default Home
