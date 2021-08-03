import React from 'react'
import { Card, CardHeader, makeStyles, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

/* style for the activity card */
const useStyles = makeStyles((theme) => ({
}));

/*Selection Card components of the booking */
export default function SelectionCard({data, handleRemove}) {
    const classes = useStyles();

    /* change the date format */
    let day = data.startDate.getDate();
    if(day < 10){
        day = "0" + day;
    }
    let month = data.startDate.getMonth() +1;
    if(month < 10){
        month = "0" + month;
    }
    let year = data.startDate.getFullYear();
    if(year < 10){
        year = "0" + year;
    }

    /*change the time format */
    let sHours = data.startDate.getHours().toString();
    if(sHours < 10){
        sHours = "0" + sHours;
    }
    let sMinutes = data.startDate.getMinutes();
    if(sMinutes < 10){
        sMinutes = "0" + sMinutes;
    }
    let eHours = data.endDate.getHours().toString();
    if(eHours < 10){
        eHours = "0" + eHours;
    }
    let eMinutes = data.endDate.getMinutes();
    if(eMinutes < 10){
        eMinutes = "0" + eMinutes;
    }

    const timeString = sHours +":"+ sMinutes + " - " + eHours + ":" + eMinutes;
    const dateString = day + "." + month + "." + year;

    return (
        <Card className={classes.root}>
            {/*display the date and time of the activity in the selection */}
            <CardHeader
                title={dateString}
                subheader = {timeString}
                action={
                    <Tooltip
                        id="tool-tip-edit"
                        title='Remove'
                        placement='top'
                    >
                        {/*optino to delete the selection */}
                        <IconButton onClick={() => handleRemove(data.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }
            />
        </Card>
    )
}
