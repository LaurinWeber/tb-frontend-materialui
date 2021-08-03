import React from 'react'
import { FormControl, Select, InputLabel, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
})

/* Dropdown component for the filter */
export default function Dropdown({ choices, label, data,value, setData, error = null, helperText = null }) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper} >
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <InputLabel id={'select-id'}>{label}</InputLabel>
                <Select
                    labelId="select-id"
                    defaultValue={value}
                    value={value}
                    onChange={(e) => setData({ ...data, [label]: e.target.value })}
                    label={label}
                    variant={"filled"}
                    error={error}
                    helperText={error && helperText}

                >
                    {choices.map((choice) => (
                        <MenuItem
                            key={choice}
                            value={choice}
                            className={classes.item}
     
                        >
                            {choice}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
