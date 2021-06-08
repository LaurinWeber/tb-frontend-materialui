import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Grid, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (account) => {
            if (account.isActive == true) {
                return green[500]
            } else {
                return red[500]
            }
        }
    }
})

export default function AccountCard({ account }) {
    const classes = useStyles(account)

    return (
        <div>
            <Card elevation={3} >
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}/>
                    }
                    action={
                        <Tooltip
                        id="tool-tip-edit"
                        title='Edit Account'
                        placement='top'
                    >
                        <IconButton onClick={() => console.log('Edit', account.firstname + ' ' + account.lastname)}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    }
                    title={account.firstname + ' ' + account.lastname}
                    subheader={account.phone}
                />
            </Card>
        </div>
    )
}
