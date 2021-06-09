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

export default function AccountDetails() {
    const classes = useStyles();
    const history = useHistory();

    /*Account properties*/
    const [isActive, setIsActive] = useState(false);
    /*Person details*/
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState(false);
    const [zip, setZip] = useState('');
    const [zipError, setZipError] = useState(false);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [birthdate, setBirthdate] = useState(new Date());
    const [birthdateError, setStartBirthdate] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [ahv, setAhv] = useState('');
    const [ahvError, setAhvError] = useState(false);
    const [iban, setIban] = useState('');
    const [ibanError, setError] = useState(false);
    /*Conditions*/
    const [start, setStart] = useState(new Date());
    const [startError, setStartError] = useState(false);
    const [end, setEnd] = useState(new Date());
    const [endError, setEndError] = useState(false);
    const [isFullTime, setIsFullTime] = useState(false);
    const [salary, setSalary] = useState(0.0);
    const [salaryError, setSalaryError] = useState(false);
    /*Teaching*/
    const [gender, setGender] = useState('female');
    const [education, setEducation] = useState('ZA');
    const [educationError, setEducationError] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [languagesError, setLanguagesError] = useState(false);

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState({ category: '', beginner: false, advanced: false, professional: false })
    const [open, setOpen] = useState(false);

    const addSkill = () => {
        //let input = { category: 'snowboard', beginner: true, advanced: true, professional: true }
        /*only add when category does not exist yet*/
        if (!skills.length) {
            setSkills([...skills, skill]);
        }
        else {
            const sameSkill = skills.filter(sk => sk.category == skill.category)
            console.log(sameSkill)
            if (sameSkill.length) {
                //cat exists already message

            } else {
                setSkills([...skills, skill]);
            }
        }
        //reset skill
        setSkill({ category: '', beginner: false, advanced: false, professional: false });

    }

    const deleteSkill = (category) => {
        const newSkills = skills.filter(skill => skill.category != category);
        setSkills(newSkills);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //reset errors
        setFirstnameError(false);
        setLastnameError(false)
        setPhoneError(false)

        //checks
        if (firstname == '') {
            setFirstnameError(true)
        }
        if (lastnameError == '') {
            setLastnameError(true)
        }
        if (phone == '') {
            setPhoneError(true)
        }

        if (firstname) {
            //console.log(firstname, gender)
            //Post
            fetch('http://localhost:8000/accounts', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ isActive, firstname, lastname, address, zip, city, birthdate, email, password, phone, ahv, iban, start, end, isFullTime, salary, gender, education, skills, languages })
            }).then(() => history.push('/'))
        }
    }
    console.log(skill)
    return (
        <Container>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container fullWidth spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
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
                            onChange={(e) => setFirstname(e.target.value)}
                            error={firstnameError}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            required
                            className={classes.field}
                            onChange={(e) => setLastname(e.target.value)}
                            error={lastnameError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAddress(e.target.value)}
                            error={addressError}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Zip"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setZip(e.target.value)}
                            error={zipError}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setCity(e.target.value)}
                            error={cityError}
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
                                value={birthdate}
                                onChange={(date) => setBirthdate(date)}
                                error={birthdateError}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            className={classes.field}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            required
                            className={classes.field}
                            onChange={(e) => setPhone(e.target.value)}
                            error={phoneError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="AVS / AHV"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setAhv(e.target.value)}
                            error={ahvError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="IBAN"
                            variant="outlined"
                            fullWidth
                            className={classes.field}
                            onChange={(e) => setIban(e.target.value)}
                            error={ibanError}
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
                                    checked={isFullTime}
                                    onChange={() => setIsFullTime(!isFullTime)}
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
                            onChange={(e) => setSalary(e.target.value)}
                            error={salaryError}
                        />
                        {isFullTime ? 'CHF / Month' : 'CHF / Hour'}
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
                                value={start}
                                onChange={(date) => setStart(date)}
                                error={startError}
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
                                value={end}
                                onChange={(date) => setEnd(date)}
                                error={endError}
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
                                    <MenuItem value={'ski'}>Ski</MenuItem>
                                    <MenuItem value={'snowboard'}>Snowboard</MenuItem>
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
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Gender</FormLabel>
                            <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
                                <FormControlLabel value='female' control={<Radio />} label='Female' />
                                <FormControlLabel value='male' control={<Radio />} label='Male' />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl className={classes.field}>
                            <FormLabel color={'secondary'}>Education</FormLabel>
                            <RadioGroup value={education} onChange={(e) => setEducation(e.target.value)}>
                                <FormControlLabel value='ZA' control={<Radio />} label='ZA' />
                                <FormControlLabel value='Aspirant' control={<Radio />} label='Aspirant' />
                                <FormControlLabel value='Instructor' control={<Radio />} label='Instructor' />
                                <FormControlLabel value='Patente' control={<Radio />} label='Patente' />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl component="fieldset" className={classes.field}>
                            <FormLabel component="legend">Languages</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={languages.en} onChange={(e) => setLanguages({ ...languages, [e.target.name]: e.target.checked })} name="en" />}
                                    label="EN"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={languages.fr} onChange={(e) => setLanguages({ ...languages, [e.target.name]: e.target.checked })} name="fr" />}
                                    label="FR"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={languages.de} onChange={(e) => setLanguages({ ...languages, [e.target.name]: e.target.checked })} name="de" />}
                                    label="DE"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={languages.it} onChange={(e) => setLanguages({ ...languages, [e.target.name]: e.target.checked })} name="it" />}
                                    label="IT"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            startIcon={<PublishIcon />}
                        >
                            Add Account
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container >
    )
}

