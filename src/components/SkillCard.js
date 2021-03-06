import React from 'react'
import { Card, CardHeader, IconButton, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { green, red } from '@material-ui/core/colors';
import * as FaIcons from "react-icons/fa";

/*Skill card styling */
const useStyles = makeStyles({
    avatar: {
        backgroundColor: (skill) => {
            if (skill.category === 'ski') {
                return green[500]
            }
            if (skill.category === 'snowboard') {
                return red[500]
            }
        }
    },
    card:{
        marginTop: 10
    }
})

/*Skill card component */
export default function SkillCard({ skill, deleteSkill, isOverview }) {
    const classes = useStyles(skill)

    /*create the level strings */
    var levels = '';
    if (skill.beginner) {
        levels = 'Beginner ';
    }
    if (skill.advanced) {
        levels = levels + 'Advanced '
    }
    if (skill.professional) {
        levels = levels + 'Professional'
    }

    var avatar = null;
    if (skill.category === 'ski') {
        avatar = <FaIcons.FaSkiing />;
    }
    if (skill.category === 'snowboard') {
        avatar = <FaIcons.FaSnowboarding />
    }

    return (
        <div>
            {/*different skill card representation in the accounts overview than in the form, conditional rendering if else */}
            {isOverview ?
                <Card elevation={3} className={classes.card} >
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {avatar}
                            </Avatar>
                        }
                        title={skill.category.toUpperCase()}
                        subheader={levels}
                    />
                </Card>
                :
                <Card elevation={3} >
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {avatar}
                            </Avatar>
                        }
                        action={
                            <Tooltip
                                id="tool-tip-delete"
                                title='Delete Skill'
                                placement='top'
                            >
                                <IconButton onClick={() => deleteSkill(skill.category)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        title={skill.category.toUpperCase()}
                        subheader={levels}
                    />
                </Card>
            }
        </div>
    )
}
