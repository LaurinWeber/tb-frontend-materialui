import React, {useState} from 'react'
import { Card,CardActions, Collapse, Typography, CardHeader, CardContent, IconButton, Grid, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { green, red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme)=>({
    avatar: {
        backgroundColor: (account) => {
            if (account.isActive == true) {
                return green[500]
            } else {
                return red[500]
            }
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))

export default function AccountCard({ account }) {
    const classes = useStyles(account)
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Card elevation={3} >
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar} />
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
                <CardActions disableSpacing>
                    <IconButton
                        className={classes.expand, {
                            [classes.expandOpen]: expanded,
                        }}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}
