import React, { useState } from 'react'
import {InputAdornment,IconButton, Button, Container, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Switch, Grid, FormGroup, Checkbox, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SkillCard from '../../components/SkillCard';
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

export default function AccountForm({ account, setAccount, skill, setSkill, skills, setSkills, addSkill, deleteSkill, categories, handleSubmit, error, setError }) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword= () =>{
        setShowPassword(!showPassword)
    }

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
                            value={account.firstname}
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
                            error={error.firstname[0]}
                            helperText = {error.firstname[0] && error.firstname[1]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={account.lastname}
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
                            error={error.lastname[0]}
                            helperText = {error.lastname[0] && error.lastname[1]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={account.address}
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
                            error={error.address[0]}
                            helperText = {error.address[0] && error.address[1]}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={account.zip}
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
                            error={error.zip[0]}
                            helperText = {error.zip[0] && error.zip[1]}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                        value={account.city}
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
                            error={error.city[0]}
                            helperText = {error.city[0] && error.city[1]}
                        />
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={12}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputValue={account.birthdate}
                                value={account.birthdate}
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker"
                                label="Birthdate"
                                onChange={(date) => setAccount(prevState => (
                                    {
                                        ...prevState,
                                        birthdate: date
                                    }
                                ))}
                                error={error.birthdate[0]}
                                helperText = {error.birthdate[0] && error.birthdate[1]}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        value={account.email}
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
                            error={error.email[0]}
                            helperText = {error.email[0] && error.email[1]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={account.password}
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    password: e.target.value
                                }
                            ))}
                            InputProps={{ 
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={handleShowPassword}
                                      onMouseDown={handleShowPassword}
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            error={error.password[0]}
                            helperText = {error.password[0] && error.password[1]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                        value={account.phone}
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
                            error={error.phone[0]}
                            helperText = {error.phone[0] && error.phone[1]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        value={account.ahv}
                            label="AVS / AHV"
                            maxLen
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAccount(prevState => (
                                {
                                    ...prevState,
                                    ahv: e.target.value
                                }
                            ))}
                            error={error.ahv[0]}
                            helperText = {error.ahv[0] && error.ahv[1]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          value={account.iban}
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
                            error={error.iban[0]}
                            helperText = {error.iban[0] && error.iban[1]}
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
                        value={account.salary}
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
                            error={error.salary[0]}
                            helperText = {error.salary[0] && error.salary[1]}
                        />
                        {account.isFullTime ? 'CHF / Month' : 'CHF / Hour'}
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputValue={account.start}
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
                                error={error.start[0]}
                                helperText = {error.start[0] && error.start[1]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputValue={account.end}
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
                                error={error.end[0]}
                                helperText = {error.end[0] && error.end[1]}
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
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            onClick={addSkill/*() => setSkills([...skills, skill])*/}
                        >
                            Add Skill
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Gender</FormLabel>
                            <RadioGroup value={account.gender}  defaultValue={account.gender} onChange={(e) => setAccount(prevState => (
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
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Education</FormLabel>
                            <RadioGroup value={account.education} defaultValue={account.education} onChange={(e) => setAccount(prevState => (
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
                    <Grid item xs={12} sm={4}>
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
                </Grid>
        </Container >
    )
}

