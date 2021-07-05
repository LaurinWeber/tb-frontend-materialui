import React, { useEffect, useState } from 'react'
import { Container, Grid, Button, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import AccountCard from '../../components/AccountCard'
import PublishIcon from '@material-ui/icons/Publish';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
import AccountForm from './AccountForm';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => {
    return {
        icon: {
            width: 80,
            height: 80,

        },
        field: {

            marginTop: 5,
            marginBottom: 5,
            display: 'Block'
        },
        skills: {
            border: '1px solid',
            borderRadius: '5px  5px  5px  5px ',

        },
        button: {
            marginTop: 50
        },
        right: {
            position: "relative",
            float: "right",
            marginRight: 5
        },
        left: {
            position: "relative",
            float: "left",
            marginLeft: 5
        },
        saveIcon: {
            height: 100
        }
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


export default function Accounts() {
    const classes = useStyles();
    const history = useHistory();
    const [accounts, setAccounts] = useState([])
    const [account, setAccount] = useState(ACCOUNT);
    const [showForm, setShowForm] = useState(false)

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState({ category: '', beginner: false, advanced: false, professional: false })

    //const [account, setAccount] = useState(ACCOUNT);
    const [error, setError] = useState(ERROR);
    const [categories, setCategories] = useState(CATEGORIES);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        fetch('https://localhost:5001/account')
            .then(res => res.json())
            .then(data => setAccounts(data))
    }, [accounts, skills])

    useEffect(() => {
        if (skills.length === 0) {
            console.log("skill null")
        }
        else {
            console.log("skill")
            setAccount((prevState) => ({
                ...prevState,
                skills: skills
            }))
        }
        setSkill({ category: '', beginner: false, advanced: false, professional: false });
    }, [skills])

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
            //setSkill({ category: '', beginner: false, advanced: false, professional: false });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

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

        if (isNew) {
            fetch('https://localhost:5001/account', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(
                    account)
            }).then(() => history.push('/'))
        } else {
            fetch('https://localhost:5001/account', {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(
                    account)
            }).then(() => history.push('/'))
        }

        handleAddAccount();
    }

    const handleAddAccount = () => {
        setShowForm(!showForm)
        setSkills([]);
        setAccount(ACCOUNT)
        setIsNew(true)
    }

    const handleEdit = async (id) => {
        setShowForm(!showForm)
        const ea = accounts.filter(account => account.accountID === id);
        const sk = ea[0].skills
        setSkills(sk)
        setAccount(ea[0])
        setIsNew(false)
    }

    const deleteSkill = (category) => {
        const newSkills = skills.filter(skill => skill.category != category);
        setSkills(newSkills);
    }

    const handleDelete = async (id) => {
        fetch('https://localhost:5001/account/' + id, {
            method: 'DELETE',
        })
        //do not display deleted item
        const newAccounts = accounts.filter(account => account.accountID != id);
        setAccounts(newAccounts);
    }

    return (
        <Container>
            {showForm ?
                <>
                    <Grid container >
                        <Grid item xs={6}>
                            <IconButton className={classes.left}
                                edge="end"
                                fullWidth
                                type="submit"
                                color="secondary"
                                variant="outline"
                                onClick={handleAddAccount}
                            >
                                <ArrowBackIosIcon /> Back
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton className={classes.right}
                                edge="start"
                                fullWidth
                                type="submit"

                                variant="outline"
                                onClick={handleSubmit}
                                size="large"
                            >
                                <SaveIcon color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <AccountForm
                        categories={categories}
                        account={account}
                        error={error}
                        setError={setError}
                        addSkill={addSkill}
                        skills={skills}
                        skill={skill}
                        setSkill={setSkill}
                        setAccount={setAccount}
                        setSkills={setSkills}
                        deleteSkill={deleteSkill}
                        handleSubmit={handleSubmit}
                    />
                    <Grid item xs={12} spacing={10}>
                        {
                            isNew ?
                                <Button
                                    className={classes.button}
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    startIcon={<PublishIcon />}
                                >
                                    Create Account
                                </Button>
                                :
                                <Button
                                    className={classes.button}
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSubmit}

                                >
                                    Save Changes
                                </Button>
                        }

                    </Grid>
                </> :
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Tooltip
                            id="tool-tip-save"
                            title='Add Account'
                            placement='top'
                        >
                            <IconButton size={'small'}
                                className={classes.right}
                                onClick={() => setShowForm(!showForm)}
                            >
                                <AddCircleIcon className={classes.icon} color={'secondary'} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    {accounts.map(account => (
                        <Grid item key={account.id} xs={12} sm={6} md={4}>
                            <AccountCard account={account} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </Grid>
                    ))}
                </Grid>}
        </Container>
    )
}
