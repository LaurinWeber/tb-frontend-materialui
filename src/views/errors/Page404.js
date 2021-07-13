import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            paddingTop: 80,
        },
    }
})

function Page404() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            404 Page not found
        </div>
    )
}

export default Page404
