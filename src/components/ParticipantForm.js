import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, TextField, IconButton } from '@material-ui/core'
import Dropdown from './Dropdown';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

/*component styling */
const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            padding: 0
        }
    }
})

/*Dropdown options */
const Languages = ["German", "French", "Italian", "English"]
const Genders = ["Male", "Female"]
const Level = "Beginner";

/*Initial values of the form fields */
const INITIAL = {
    Firstname: "",
    Lastname: "",
    Language: "",
    Birthdate: "",
    Gender: "",
    Level: "",
};

/* constant defines initial values of the error. At the beginning there is no error and also no erro messages */
const ERROR = {
    firstname: [false, ""],
    lastname: [false, ""],
    language: [false, ""],
    birthdate: [false, ""],
    gender: [false, ""],
};

//form validation of the participants form
function formValuesCheck(data, setError) {
    //reset Errors
    setError(ERROR)

    //assumption there is no error, if there is a custom error message is added and the boolean value os the error CONST set to true
    let isOk = true;

    //make check on firstname
    let eFirstname = [false, ""];
    if (data.Firstname == '') {
        eFirstname = [true, "empty"];
    }
    if (data.Firstname.length > 50) {
        eFirstname = [true, "Max length 50 character" + " | Remove " + (data.Firstname.length - 50) + " character(s)"];
    }
    if (eFirstname[0]) {
        setError((prevState) => ({
            ...prevState,
            firstname: eFirstname,
        }))
        isOk = false;
    }

    //make check on lastname 
    let eLastname = [false, ""];
    if (data.Lastname == '') {
        eLastname = [true, "empty"];
    }
    if (data.Lastname.length > 50) {
        eLastname = [true, "Max length 50 character" + " | Remove " + (data.Lastname.length - 50) + " character(s)"];
    }
    if (eLastname[0]) {
        setError((prevState) => ({
            ...prevState,
            lastname: eLastname,
        }))
        isOk = false;
    }

    //check birthdate
    let eBdate = [false, ""];
    if (data.Birthdate == '') {
        eBdate = [true, "empty"];
    }
    if (eBdate[0]) {
        setError((prevState) => ({
            ...prevState,
            birthdate: eBdate,
        }))
        isOk = false;
    }

    //check language
    let eLanguage = [false, ""];
    if (data.Language == "") {
        eLanguage = [true, "empty"];
    }
    if (eLanguage[0]) {
        setError((prevState) => ({
            ...prevState,
            language: eLanguage,
        }))
        isOk = false;
    }

    //check the gender
    let eGender = [false, ""];
    if (data.Gender == '') {
        eGender = [true, "empty"];
    }
    if (eGender[0]) {
        setError((prevState) => ({
            ...prevState,
            gender: eGender,
        }))
        isOk = false;
    }
    return isOk;
}

/* Participant from component */
export default function ParticipantForm({ setCurrent, participants, setParticipants, numberParticipants }) {
    const classes = useStyles();
    const [participant, setParticipant] = useState(INITIAL);
    const [error, setError] = useState(ERROR);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [index, setIndex] = useState(0);

    //on participant change the participant is added to the participants state 
    useEffect(() => {
        //alert(JSON.stringify(participant))
        addParticipantToList();
    }, [participant])

    //check if arrows have to be shown or not, if there is one participants no arrow should be shown to go to the next participant
    useEffect(() => {
        setIsFirst(true);

        if (numberParticipants <= 1) {
            setIsLast(true);
        }
    }, [])

    //adds the participant to the list
    const addParticipantToList = () => {
        //check if participant index exists => change entry
        if (participants[index] != undefined || participants[index] != null) {
            //copy list
            let items = [...participants];

            //Replace properties
            let item = participant;
            //back to array
            items[index] = item;
            //set the state with new object
            setParticipants(items);
        } else if (index <= 0) {
            //is first entry
            setParticipants([participant])
        } else if (index >= 1) {
            //already entries in list, append
            setParticipants(prevState => [...prevState, participant])
        }
    }

    //handle next click
    const handleNext = () => {
        if (formValuesCheck(participant, setError)) {
            setIsFirst(false);
            //check if next is last
            if (index + 1 >= numberParticipants - 1) {
                setIsLast(true);
            }

            //check if next item exists 
            if (participants[index + 1] != undefined || participants[index + 1] != null) {
                //set data
                let next = { ...participants[index + 1] }
                setParticipant(next);
            } else {
                setParticipant(INITIAL)
            }
            setIndex(prevState => prevState + 1);
            setCurrent(prevState => prevState + 1);
        }
    }

    //handle prevois button click
    const handlePrevious = () => {
        if (formValuesCheck(participant, setError)) {
            setIsLast(false);

            //check if on prev click index is first
            if (index - 1 <= 0) {
                setIsFirst(true);
            }

            //check if previous item exists 
            if (participants[index - 1] != undefined || participants[index - 1] != null) {
                //set data
                //copy list
                let prevs = [...participants];
                //copy item
                let prev = { ...prevs[index - 1] }

                setParticipant(prev);
            } else {
                setParticipant(INITIAL)
            }
            setIndex(prevState => prevState - 1);
            setCurrent(prevState => prevState - 1);
        }
    }

    /*components that are being rendered */
    return (
        <Grid container spacing={3} className={classes.wrapper}>
            <Grid item xs={4} className={classes.item}>
                <TextField
                    value={participant.Firstname}
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setParticipant(prevState => (
                        {
                            ...prevState,
                            Firstname: e.target.value
                        }
                    ))}
                    error={error.firstname[0]}
                    helperText={error.firstname[0] && error.firstname[1]}
                />
            </Grid>
            <Grid item xs={4} className={classes.item}>
                <TextField
                    value={participant.Lastname}
                    label="Lastname"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setParticipant(prevState => (
                        {
                            ...prevState,
                            Lastname: e.target.value
                        }
                    ))}
                    error={error.lastname[0]}
                    helperText={error.lastname[0] && error.lastname[1]}
                />
            </Grid>
            <Grid item xs={4} className={classes.item}>
                <Dropdown
                    label={"Language"}
                    data={participant}
                    value={participant.Language}
                    setData={setParticipant}
                    choices={Languages}
                    error={error.gender[0]}
                    helperText={error.gender[1]}
                />
            </Grid>
            <Grid item xs={4} className={classes.item}>
                {/*wrapper for the date picker */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}
                    defaultValue={null}
                    initialFocusedDate={null}
                >
                    <KeyboardDatePicker
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={participant.Birthdate}
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="date-picker"
                        label="Birthdate"
                        fullWidth
                        onChange={(date) => setParticipant(prevState => (
                            {
                                ...prevState,
                                Birthdate: date
                            }
                        ))}
                        error={error.birthdate[0]}
                        helperText={error.birthdate[0] && error.birthdate[1]}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4} className={classes.item}>
                <Dropdown
                    label={"Gender"}
                    data={participant}
                    value={participant.Gender}
                    setData={setParticipant}
                    choices={Genders}
                    error={error.gender[0]}
                    helperText={error.gender[1]}
                ></Dropdown>
            </Grid>
            <Grid item xs={4} className={classes.item}>
                <TextField
                    value={Level}
                    label="Level"
                    variant="outlined"
                    fullWidth
                    disabled
                />
            </Grid>
            {/*show previous icon button or not */}
            {!isFirst &&
                <Grid item xs={isLast ? 12 : 6} className={classes.item}>
                    <IconButton
                        color='sencondary'
                        variant={"contained"}
                        fullWidth
                        onClick={() => handlePrevious()}
                    >
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </IconButton>
                </Grid>
            }
            {/*show next icon button or not */}
            {!isLast &&
                <Grid item xs={isFirst ? 12 : 6} className={classes.item} align="right">
                    <IconButton
                        color='sencondary'
                        variant={"contained"}
                        fullWidth
                        onClick={() => handleNext()}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            }
        </Grid>
    )
}
