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
import AccountForm from './AccountForm';

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

const CATEGORIES = ['ski', 'snowboard'];

const GENDERS = ['female', 'male'];
const EDUCATIONS = ['ZA', 'Aspirant', 'Instructor', 'Patenter'];
const LANGUAGES = ['en', 'fr', 'de', 'it'];

const ACCOUNT = {
    isActive: false,
    firstname: '',
    lastname: '',
    address: '',
    zip: '',
    city: '',
    birthdate: new Date(),
    email: '',
    password: '',
    phone: '',
    ahv: '',
    iban: '',
    start: new Date(),
    end: new Date(),
    isFullTime: false,
    salary: 0,
    gender: GENDERS[0],
    education: EDUCATIONS[0],
    skills: [],
    languages: { en: false, fr: false, de: false, it: false }
};

const ERROR = {
    isActive: false,
    firstname: false,
    lastname: false,
    address: false,
    zip: false,
    city: false,
    birthdate: false,
    email: false,
    password: false,
    phone: false,
    ahv: false,
    iban: false,
    start: false,
    end: false,
    isFullTime: false,
    salary: false,
    gender: false,
    education: false,
    skills: false,
    languages: false
};


export default function AccountDetails() {
    const classes = useStyles();
    const history = useHistory();

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState({ category: '', beginner: false, advanced: false, professional: false })

    const [account, setAccount] = useState(ACCOUNT);
    const [error, setError] = useState(ERROR);
    const [categories, setCategories] = useState(CATEGORIES);

    const addSkill = () => {
        //let input = { category: 'snowboard', beginner: true, advanced: true, professional: true }
        /*only add when category does not exist yet*/
        console.log(skill)
        if (skill.category) {
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
                console.log(skills)
            }
            //const newCategories = categories.filter(cat => cat != skill.category)
            //setCategories(newCategories);

            //reset skill
            setSkill({ category: '', beginner: false, advanced: false, professional: false });
        }
    }

    const deleteSkill = (category) => {
        const newSkills = skills.filter(skill => skill.category != category);
        setSkills(newSkills);
    }

    const handleSubmit = () => {

        //reset errors
        setError((prevState) => ({
            ...prevState,
            firstname: false,
            lastname: false,
            phone: false
        }))

        //checks
        if (account.firstname == '') {
            setError((prevState) => ({
                ...prevState,
                firstname: true,
            }))
        }
        if (account.lastname == '') {
            setError((prevState) => ({
                ...prevState,
                lastname: true,
            }))
        }
        if (account.phone == '') {
            setError((prevState) => ({
                ...prevState,
                phone: true,
            }))
        }
        console.log(account)

        if (account.firstname) {

            //console.log(firstname, gender)
            //Post
            fetch('http://localhost:8000/accounts', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(
                    account)
            }).then(() => history.push('/'))
        }
    }

    return (
        <Container>
            <AccountForm categories={categories} account={account} error={error} setError={setError} skills={skills} skill={skill} setSkill={setSkill} setAccount={setAccount} addSkill={addSkill} deleteSkill={deleteSkill} handleSubmit={handleSubmit} />
            <Grid item xs={12}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<PublishIcon />}
                >
                    Add Account
                </Button>
            </Grid>
        </Container >
    )
}

