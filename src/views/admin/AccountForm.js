import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, IconButton, Button, Container, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Switch, Grid, FormGroup, Checkbox, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from "@material-ui/core";
import { Block } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SkillCard from '../../components/SkillCard';
import CloseIcon from '@material-ui/icons/Close';
import SkillForm from './SkillForm';

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

const GENDERS = ['female', 'male'];
const EDUCATIONS = ['ZA', 'Aspirant', 'Instructor', 'Patenter'];
const LANGUAGES = ['en', 'fr', 'de', 'it'];

export default function AccountForm({ account, setAccount, skill, setSkill, skills, addSkill, deleteSkill, categories, handleSubmit, error, setError }) {
    const classes = useStyles();

    return (
        <Container>
                <Grid container fullWidth spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={account.isActive}
                                    onChange={() => setAccount(prevState => (
                                        {
                                            ...prevState,
                                            isActive: !account.isActive
                                        }
                                    ))}
                                    name="active"
                                    color="primary"
                                />
                            }
                            label="Active"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography

                            variant={"h6"}
                            color={"textSecondary"}
                            component={"h2"}
                            gutterBottom
                        >
                            Personal - Details
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Firstname"
                            variant="outlined"
                            fullWidth
                            required
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    firstname: e.target.value
                                }
                            ))}
                            error={error.firstname}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            required
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    lastname: e.target.value
                                }
                            ))}
                            error={error.lastname}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    address: e.target.value
                                }
                            ))}
                            error={error.address}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Zip"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    zip: e.target.value
                                }
                            ))}
                            error={error.zip}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    city: e.target.value
                                }
                            ))}
                            error={error.city}
                        />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={12}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker"
                                label="Birthdate"
                                value={account.birthdate}
                                onChange={(date) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        birthdate: date
                                    }
                                ))}
                                error={error.birthdate}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    email: e.target.value
                                }
                            ))}
                            error={error.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    password: e.target.value
                                }
                            ))}
                            error={error.password}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            required
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    phone: e.target.value
                                }
                            ))}
                            error={error.phone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="AVS / AHV"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    ahv: e.target.value
                                }
                            ))}
                            error={error.ahv}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="IBAN"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    iban: e.target.value
                                }
                            ))}
                            error={error.iban}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography

                            variant={"h6"}
                            color={"textSecondary"}
                            component={"h2"}
                            gutterBottom
                        >
                            Employment - Conditions
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={account.isFullTime}
                                    onChange={() => setAccount(prevState => (
                                        {
                                            ...prevState,
                                            isFullTime: !account.isFullTime
                                        }
                                    ))}
                                    name="active"
                                    color="primary"
                                />
                            }
                            label="Full Time Employment"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Salary"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    salary: e.target.value
                                }
                            ))}
                            error={error.salary}
                        />
                        {account.isFullTime ? 'CHF / Month' : 'CHF / Hour'}
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker"
                                label="Start-Date"
                                value={account.start}
                                onChange={(date) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        start: date
                                    }
                                ))}
                                error={error.start}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker"
                                label="End-Date"
                                value={account.end}
                                onChange={(date) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        end: date
                                    }
                                ))}
                                error={error.end}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12}>
                        <Typography

                            variant={"h6"}
                            color={"textSecondary"}
                            component={"h2"}
                            gutterBottom
                        >
                            Teaching - Skills
                        </Typography>
                    </Grid>
                    {skills.length ? skills.map(skill => (
                        <Grid item key={skill.category} xs={12} sm={12} md={12}>
                            <SkillCard skill={skill} deleteSkill={deleteSkill} />
                        </Grid>
                    )) : null}
                    <SkillForm skill={skill} setSkill={setSkill} categories={categories} />
                    <Grid item xs={6} sm={6}>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            onClick={addSkill}
                        >
                            Add Skill
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Gender</FormLabel>
                            <RadioGroup value={account.gender} onChange={(e) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        gender: e.target.value
                                    }
                                ))}>
                                {GENDERS.map((g) =>(
                                     <FormControlLabel value={g} control={<Radio />} label={g} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Education</FormLabel>
                            <RadioGroup value={account.education} onChange={(e) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        education: e.target.value
                                    }
                                ))}>
                                {EDUCATIONS.map((e) =>(
                                     <FormControlLabel value={e} control={<Radio />} label={e} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl component="fieldset" className={classes.field}>
                            <FormLabel component="legend">Languages</FormLabel>
                            <FormGroup>
                                {LANGUAGES.map((l) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={account.languages[l]} onChange={(e) => setAccount(prevState => (
                                            {
                                                ...prevState,
                                                languages:
                                                {
                                                    ...prevState.languages,
                                                    [e.target.name]: e.target.checked
                                                }
                                            }
                                        ))}
                                            name={l} />}
                                        label={l}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    {console.log(account)}
                </Grid>
        
        </Container >
    )
}

