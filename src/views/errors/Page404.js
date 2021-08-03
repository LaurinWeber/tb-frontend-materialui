import React from 'react'
import { makeStyles } from '@material-ui/core';

//CSS styling => material ui style
const useStyles = makeStyles((theme) => {
    return {
        root: {
            paddingTop: 80,
        },
    }
})

//component
function Page404() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            404 Page not found
        </div>
    )
}

export default Page404
