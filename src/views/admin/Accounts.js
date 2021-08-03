import React, { useEffect, useState } from 'react'
import { Container, Grid, Button, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import AccountCard from '../../components/AccountCard'
import PublishIcon from '@material-ui/icons/Publish';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
import AccountForm from '../../components/AccountForm';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import request from '../../utils/request';
import Alert from '@material-ui/lab/Alert'; //to show custom api errors
import CircularProgress from '@material-ui/core/CircularProgress';


// CSS
const useStyles = makeStyles((theme) => {
    return {
        item: {
            padding: 20
        },
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

//initial Values
const CATEGORIES = ['ski', 'snowboard'];
const GENDERS = ['female', 'male'];
const EDUCATIONS = ['ZA', 'Aspirant', 'Instructor', 'Patenter'];
const LANGUAGES = ['en', 'fr', 'de', 'it'];

//account object initial values
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

//errors initial values
const ERROR = {
    isActive: false,
    firstname: [false, ""],
    lastname: [false, ""],
    address: [false, ""],
    zip: [false, ""],
    city: [false, ""],
    birthdate: [false, ""],
    email: [false, ""],
    password: [false, ""],
    phone: [false, ""],
    ahv: [false, ""],
    iban: [false, ""],
    start: [false, ""],
    end: [false, ""],
    isFullTime: false,
    salary: [false, ""],
    gender: false,
    education: false,
    skills: false,
    languages: false
};

/*Source : https://codepen.io/Lumnezia/pen/WLvLzW*/
//Validate Insurance-Number-Function
function validateAhv(number) {
    let regex = /[7][5][6][.][\d]{4}[.][\d]{4}[.][\d]{2}$/
    let isValid = false

    //Last digit of the entered number
    let checknumber = parseInt(number[number.length - 1])

    //Validate the general setup of the insurance-number using the regex defined above
    isValid = regex.test(number);
    if (isValid) {
        //Remove last character (not needed to calculate checksum)
        let tmp_number = number.substr(0, number.length - 1)

        //Remove dots from number and reverse it 
        //(if you want to know why, look at the rules in the link given in the html-comment)
        tmp_number = tmp_number.split(".").join("").split("").reverse().join("")
        let sum = 0
        for (let i = 0; i < tmp_number.length; i++) {
            var add = i % 2 == 0 ? tmp_number[i] * 3 : tmp_number[i] * 1
            sum += add
        }

        //Calculate correct checksum (again, see the documentation to undestand why)
        let checksum = (Math.ceil(sum / 10) * 10) - sum
        if (checksum !== checknumber) {
            isValid = false
        }
    }
    return isValid
}

//form validation of the account form
function formValuesCheck(account, accounts, setError, isNew) {
    //reset Errors
    setError(ERROR)

    let isOk = true;

    let eFirstname = [false, ""];
    if (account.firstname == '') {
        eFirstname = [true, "empty"];
    }
    if (account.firstname.length > 50) {
        eFirstname = [true, "Max length 50 character" + " | Remove " + (account.firstname.length - 50) + " character(s)"];
    }
    if (eFirstname[0]) {
        setError((prevState) => ({
            ...prevState,
            firstname: eFirstname,
        }))
        isOk = false;
    }

    let eLastname = [false, ""];
    if (account.lastname == '') {
        eLastname = [true, "empty"];
    }
    if (account.lastname.length > 50) {
        eLastname = [true, "Max length 50 character" + " | Remove " + (account.lastname.length - 50) + " character(s)"];
    }
    if (eLastname[0]) {
        setError((prevState) => ({
            ...prevState,
            lastname: eLastname,
        }))
        isOk = false;
    }

    let eAddress = [false, ""];
    const validAddress = new RegExp('(.)*\\d');
    if (!validAddress.test(account.address)) {
        eAddress = [true, "Address must contain the street-number"];
    }
    if (account.address == '') {
        eAddress = [true, "empty"];
    }
    if (account.address.length > 255) {
        eAddress = [true, "Max length 255 character" + " | Remove " + (account.lastname.length - 255) + " character(s)"];
    }
    if (eAddress[0]) {
        setError((prevState) => ({
            ...prevState,
            address: eAddress,
        }))
        isOk = false;
    }

    let eZip = [false, ""];
    const validZip = new RegExp('[0-9]{4}$');

    if (!validZip.test(account.zip)) {
        eZip = [true, "must be 4 digit number"];
    }
    if (account.zip == '') {
        eZip = [true, "empty"];
    }
    if (account.zip.length > 4) {
        eZip = [true, "Max length 4 character" + " | Remove " + (account.zip.length - 4) + " character(s)"];
    }
    if (eZip[0]) {
        setError((prevState) => ({
            ...prevState,
            zip: eZip,
        }))
        isOk = false;
    }

    let eCity = [false, ""];
    if (account.city == '') {
        eCity = [true, "empty"];
    }
    if (account.city.length > 50) {
        eCity = [true, "Max length 4 character" + " | Remove " + (account.city.length - 50) + " character(s)"];
    }
    if (eCity[0]) {
        setError((prevState) => ({
            ...prevState,
            city: eCity,
        }))
        isOk = false;
    }

    let eBdate = [false, ""];
    let diffInMs = Math.abs(account.birthdate - new Date());
    let diffDays = diffInMs / (1000 * 60 * 60 * 24);

    if (account.birthdate == '') {
        eBdate = [true, "empty"];
    }
    if (diffDays < 14) {
        eBdate = [true, "must be older 14"];
    }
    if (eBdate[0]) {
        setError((prevState) => ({
            ...prevState,
            birthdate: eBdate,
        }))
        isOk = false;
    }

    let eMail = [false, ""];
    const validMail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if (isNew) {
        if (accounts.filter(a => a.email === account.email).length > 0) {
            eMail = [true, "email already in use"];
        }
    }
    if (!validMail.test(account.email)) {
        eMail = [true, "must be email format e.g. hans.muster@mail.ch"];
    }
    if (account.email == '') {
        eMail = [true, "empty"];
    }
    if (account.email.length > 255) {
        eMail = [true, "Max length 255 character" + " | Remove " + (account.email.length - 255) + " character(s)"];
    }
    if (eMail[0]) {
        setError((prevState) => ({
            ...prevState,
            email: eMail,
        }))
        isOk = false;
    }

    let ePassword = [false, ""];
    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    if (!validPassword.test(account.password)) {
        ePassword = [true, "min 8 char, [A-Z], [a-z], [#?!@$%^&*-] "];
    }
    if (account.password == '') {
        ePassword = [true, "empty"];
    }
    if (ePassword[0]) {
        setError((prevState) => ({
            ...prevState,
            password: ePassword,
        }))
        isOk = false;
    }

    let ePhone = [false, ""];
    if (account.phone == '') {
        ePhone = [true, "empty"];
    }
    if (ePhone[0]) {
        setError((prevState) => ({
            ...prevState,
            phone: ePhone,
        }))
        isOk = false;
    }

    let eAhv = [false, ""];
    let v = validateAhv(account.ahv);
    if (!v) {
        eAhv = [true, "756.9217.0769.85"];
    }
    if (account.ahv == '') {
        eAhv = [true, "empty"];
    }
    if (eAhv[0]) {
        setError((prevState) => ({
            ...prevState,
            ahv: eAhv,
        }))
        isOk = false;
    }

    let eIBAN = [false, ""];
    var IBAN = require('iban');
    if (!IBAN.isValid(account.iban)) {
        eIBAN = [true, "CH93 0076 2011 6238 5295 7"];
    }
    if (account.iban == '') {
        eIBAN = [true, "empty"];
    }
    if (eIBAN[0]) {
        setError((prevState) => ({
            ...prevState,
            iban: eIBAN,
        }))
        isOk = false;
    }

    let eSalary = [false, ""];
    if (account.salary == 0) {
        eSalary = [true, "can not be 0"];
    }
    if (eSalary[0]) {
        setError((prevState) => ({
            ...prevState,
            salary: eSalary,
        }))
        isOk = false;
    }

    let eStart = [false, ""];
    if (account.start >= account.end) {
        eStart = [true, "Start-Date can not be after or equal End-Date"];
    }
    if (eStart[0]) {
        setError((prevState) => ({
            ...prevState,
            start: eStart,
        }))
        isOk = false;
    }

    let eEnd = [false, ""];
    if (account.start >= account.end) {
        eEnd = [true, "End-Date can not be before or equal Start-Date"];
    }
    if (eEnd[0]) {
        setError((prevState) => ({
            ...prevState,
            end: eEnd,
        }))
        isOk = false;
    }

    return isOk;
}

//accounts components
export default function Accounts() {
    const classes = useStyles();
    const history = useHistory(); //change url
    const [accounts, setAccounts] = useState([]) //accounts objects
    const [account, setAccount] = useState(ACCOUNT);
    const [showForm, setShowForm] = useState(false); //is form displayed
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState({ category: '', beginner: false, advanced: false, professional: false })

    const [error, setError] = useState(ERROR);
    const [categories, setCategories] = useState(CATEGORIES);
    const [isNew, setIsNew] = useState(true); //is new = ture when new account is created
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //initial render get all accounts, on skill change get new data as well
    useEffect(async () => {
        setIsLoading(true);
        //get token
        let token = JSON.parse(localStorage.getItem("user")).token;
        //get data
        let data = await request(
            'https://localhost:5001/account/',
            "GET", null, setApiErrorMessage, token);

        //set data 
        if (data !== null || data !== undefined) {
            setAccounts(data);
            setIsLoading(false); //reset
        }

    }, [skills])

    //add skills from the from to the account object
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
        //reset values from state of skill form
        setSkill({ category: '', beginner: false, advanced: false, professional: false });
    }, [skills])

    //add skill to the skills of the account
    const addSkill = () => {
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
        }
    }

    //instant form validation
    useEffect(() => {
        formValuesCheck(account, accounts, setError, isNew);
    }, [account])

    //on save account, check if form is valid and then send it to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Form validation after submit
        if (formValuesCheck(account, accounts, setError, isNew)) {
            //get token
            let token = JSON.parse(localStorage.getItem("user")).token;
            //get data
            let body = JSON.stringify(account);
            if (isNew) {
                //create new Account
                let response = await request(
                    'https://localhost:5001/account/',
                    "POST",
                    body, setApiErrorMessage, token);

                if (response != null || response != undefined) {
                    history.push('/')
                }
            } else {
                //update existing Account
                let response = await request(
                    'https://localhost:5001/account/',
                    "PUT",
                    body, setApiErrorMessage, token);

                if (response) {
                    history.push('/accounts')
                }
            }
            //Toggle view and reset values
            handleAddAccount();
        }
    }

    //in overview handle the add button click, toggle from overview to empty form
    const handleAddAccount = () => {
        setShowForm(!showForm)
        setSkills([]);
        setAccount(ACCOUNT)
        setIsNew(true)
    }

    /*handle the edit click, fill form with data */
    const handleEdit = (id) => {
        setShowForm(!showForm)
        const ea = accounts.filter(account => account.accountID === id);
        const sk = ea[0].skills
        setSkills(sk)
        setAccount(ea[0])
        setIsNew(false)
    }

    /*handle delete skill from an account */
    const deleteSkill = (category) => {
        const newSkills = skills.filter(skill => skill.category != category);
        setSkills(newSkills);
    }

    /*handle the delete account */
    const handleDelete = async (id) => {
        //get token
        let token = JSON.parse(localStorage.getItem("user")).token;
        //action
        let response = await request(
            'https://localhost:5001/account/' + id,
            "DELETE", null, setApiErrorMessage, token);
        //only if deletion was succssfull
        if(response){
        //do not display deleted item
        const newAccounts = accounts.filter(account => account.accountID != id);
        setAccounts(newAccounts);
        }

    }

    /*rendering */
    return (
        <Container>
            {showForm ?
                <>
                    <Grid container >
                        {apiErrorMessage &&
                            <Grid item xs={12} className={classes.item} align="center">
                                <Alert severity="error" >{apiErrorMessage} </Alert>
                            </Grid>}
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
                    {/*conditional rendering, show the loading circular boar if is loading state is set to true */}
                    {isLoading ?
                        <Grid item xs={12} className={classes.item} align="center">
                            <CircularProgress size={24} />
                        </Grid> :
                        <>
                        {/*if there are accounts show them, otherwise display the error message from the api */}
                            {accounts ?
                                <>
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
                                </> :
                                <Grid item xs={12} className={classes.item} align="center">
                                    <Alert severity="error" >{apiErrorMessage} </Alert>
                                </Grid>
                            }
                        </>}
                </Grid>}
        </Container>
    )
}
