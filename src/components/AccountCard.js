import React, { useState, useEffect } from 'react'
import { Card, CardActions, Collapse, Typography, CardHeader, CardContent, IconButton, Grid, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { green, red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SkillCard from './SkillCard';

/* styling of the account card */
const useStyles = makeStyles((theme) => ({
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
    right:{
        marginLeft: 'auto',
        float: "right"
    }
}))

/*account car component, as a function */
export default function AccountCard({ account, handleEdit, handleDelete }) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [skills, setSkills] = useState([])
    const isOverview = true;

    /* load the skills from the account */
    useEffect(() => {
        const sk = account.skills
        setSkills(sk)
    }, [])


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
                            <IconButton 
                            onClick={() => handleEdit(account.accountID)}
                            data-testid="edit-account"
                            >
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
                        data-testid="expand-account-details"
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <Tooltip
                        id="tool-tip-delete"
                        title='Delete Account'
                        placement='bottom'
                    >
                        <IconButton 
                        onClick={() => handleDelete(account.accountID)}  className={classes.right}
                        data-testid = "delete-account"
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Skills:</Typography>
                        {skills.length ? skills.map(skill => (
                            <Grid spacing={5} item key={skill.category} xs={12} sm={12} md={12}>
                                <SkillCard skill={skill} isOverview={isOverview} />
                            </Grid>
                        )) : null}

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}
