import React from 'react'
import { makeStyles} from '@material-ui/core'

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
        wrapper: {
            padding: 50
        }
    }
})


//payment components
export default function Payment({name}) {
    const classes = useStyles();

    //render component
    return (
        <div className={classes.root}>
            Payment : {name}
        </div>
    )
}
