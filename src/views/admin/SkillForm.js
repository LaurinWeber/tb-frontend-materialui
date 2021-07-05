import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, FormControlLabel, FormLabel, FormControl, Grid, FormGroup, Checkbox, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    field: {

        marginTop: 5,
        marginBottom: 5,
        display: 'Block'
    },
    skills: {
        border: '1px solid',
        borderRadius: '5px  5px  5px  5px ',

    }
})

export default function SkillForm({skill, setSkill, categories}) {
    const classes = useStyles();
    
    return (
            <Grid item xs={12} sm={12} className={classes.skills}>
                <Grid item xs={12} sm={12}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id={'select-id'}>Activity</InputLabel>
                        <Select
                            labelId="select-id"
                            value={skill.category}
                            onChange={(e) => setSkill({ ...skill, ['category']: e.target.value })}
                            label="Activity"
                        >
                            {categories.map( (category) =>(
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={6} >
                    <FormControl component="fieldset" className={classes.field}>
                        <FormLabel component="legend">Teaching levels</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={skill.beginner} onChange={(e) => setSkill({ ...skill, [e.target.name]: e.target.checked })} name="beginner" />}
                                label="Beginner"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={skill.advanced} onChange={(e) => setSkill({ ...skill, [e.target.name]: e.target.checked })} name="advanced" />}
                                label="Advanced"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={skill.professional} onChange={(e) => setSkill({ ...skill, [e.target.name]: e.target.checked })} name="professional" />}
                                label="Professional"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
    )
}


