import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Grid, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { green, red } from '@material-ui/core/colors';
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (skill) => {
            if (skill.category == 'ski') {
                return green[500]
            } 
            if (skill.category == 'snowboard') {
                return red[500]
            } 
        }
    }
})

export default function SkillCard({skill, deleteSkill}) {
    const classes = useStyles(skill)

    var levels = '';
    if(skill.beginner){
        levels = 'Beginner ';
    }
    if (skill.advanced){
        levels = levels + 'Advanced '
    }
    if(skill.professional){
        levels = levels + 'Professional'
    }

    var avatar = null;
    if(skill.category == 'ski'){
        avatar = <FaIcons.FaSkiing/>;
    }
    if (skill.category == 'snowboard'){
        avatar = <FaIcons.FaSnowboarding/>
    }
    
    return (
        <div>
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
        </div>
    )
}
