import React, { useState, useEffect } from 'react'
import { FormControlLabel, Switch, Grid, IconButton, makeStyles, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, withStyles } from '@material-ui/core'
import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import ParticipantForm from '../../components/ParticipantForm';
import BookingCalendar from '../../components/BookingCalendar';
import SelectionCard from '../../components/SelectionCard';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

//CSS styling => material ui style
const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: '0',
            marginTop: '65px',
            maxWidth: '100%',
            width: '100vw',
        },
        body: {
            minHeight: 'calc(100vh - 140px)',
            margin: 0,
            padding: 0,
            maxWidth: '100%',
            width: '100vw',
        },
        wrapper: {
            padding: 40
        },
        title: {
            padding: 40
        },
        filter: {
            padding: 20,
            paddingTop: 0
        },
        itemWrapper: {
            border: '1px solid',
            borderRadius: '5px  5px  5px  5px ',
            padding: 25,
            marginBottom: 15
        },

        calendar: {
            padding: 20
        },
        selection: {
            paddingTop: 0,
            padding: 20
        },

    }
})

//Dropdown filter options
const Activities = ["ski", "snowboard"]
const Types = ["private", "group"]
const Hours = [2, 3, 6]
const Levels = ["beginner", "advanced", "professional"]
const Languages = ["German", "French", "Italian", "English"]
const Genders = ["Male", "Female"]

export default function Booking({ offerRequest, setOfferRequest }) {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [numberParticipants, setNumberParticipants] = useState(1)
    const [participants, setParticipants] = useState([]); //participants
    const [current, setCurrent] = useState(1);
    const [open, setOpen] = useState(false);
    const [appointments, setAppointments] = useState();

    /* filter of the services */
    const renderService = (
        <Grid container className={classes.item} spacing={3}>
            <Grid item xs={12} >
                <Dropdown label={"Activity"} data={offerRequest} value={offerRequest.Activity} setData={setOfferRequest} choices={Activities} ></Dropdown>
            </Grid>
            <Grid item xs={6} >
                <Dropdown label={"Type"} data={offerRequest} value={offerRequest.Type} setData={setOfferRequest} choices={Types} ></Dropdown>
            </Grid>
            <Grid item xs={6} >
                <Dropdown label={"Hours"} data={offerRequest} value={offerRequest.Hours} setData={setOfferRequest} choices={Hours} ></Dropdown>
            </Grid>
        </Grid>
    );

    /*filter of the participant */
    const renderParticipant = (
        <Grid container className={classes.item} spacing={3}>
            <Grid item xs={12} >
                <Dropdown label={"Level"} data={offerRequest} value={offerRequest.Level} setData={setOfferRequest} choices={Levels} ></Dropdown>
            </Grid>
        </Grid>
    );

    /* anonymous function to increate amount of participants */
    const increasParticipantNumber = () => {
        //check max 5 participants per employee
        if (numberParticipants >= 5) {

        } else {
            setNumberParticipants(prevState => prevState + 1)
        }
    }

    /*decreasing the number of participants */
    const decreaseParticipantNumber = () => {
        /*check: min 1 */
        if (numberParticipants <= 1) {

        } else {
            setNumberParticipants(prevState => prevState - 1)
        }
    }

    //coach filter options on the left side
    const renderCoach = (
        <Grid container className={classes.item} spacing={3}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={offerRequest.isCertified}
                            onChange={() => setOfferRequest(prevState => (
                                {
                                    ...prevState,
                                    isCertified: !offerRequest.isCertified
                                }
                            ))}
                            name="active"
                            color="primary"
                        />
                    }
                    label="fully formed"
                />
            </Grid>
            <Grid item xs={12} >
                <Dropdown label={"Language"} data={offerRequest} value={offerRequest.Language} setData={setOfferRequest} choices={Languages} ></Dropdown>
            </Grid>
            <Grid item xs={12} >
                <Dropdown label={"Gender"} data={offerRequest} value={offerRequest.Gender} setData={setOfferRequest} choices={Genders} ></Dropdown>
            </Grid>
        </Grid>
    );

    //remove from the selection
    const handleRemove = (id) => {
        //remove from selection
        const newSelection = selected.filter(selection => selection.id != id);
        setSelected(newSelection);
    }

    const handleSelect = (appointmentData) => {
        //add to selection
        setSelected([...selected, appointmentData])

        //remove from calendar
        const newData = appointments.filter(data => data.id != appointmentData.id);
        setAppointments(newData);
    }

    /*render components */
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <Grid container className={classes.wrapper}>
                    {/*Title */}
                    <Grid item xs={12} className={classes.title}>
                        <Typography variant={"h1"} >Booking</Typography>
                        <Typography variant={"subtitle1"}>Lorem ipsum dolor sit amet, et vel pertinax assueverit. Diceret neglegentur ne eam, sit movet epicurei appareat ut, expetenda persequeris ut usu. Falli recteque molestiae nam ne, cu lorem tractatos nec. Dolore dictas cetero an sit, est recusabo efficiantur ne, no dicant veritus electram quo. Veri nemore epicuri has ut, ne munere vidisse his, duo eleifend ullamcorper philosophia cu. Laudem fastidii in mel, ex vim ridens partiendo dissentias. Malis omnes ea pri.</Typography>
                    </Grid>
                    {/*Filter */}
                    <Grid item xs={3} spacing={3} className={classes.filter}>
                        <Typography variant={"h3"}>Filter</Typography>
                        <Grid item xs={12} >
                            <Typography>Service</Typography>
                            <div className={classes.itemWrapper}>
                                {renderService}
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography>Participant</Typography>
                            <div className={classes.itemWrapper}>
                                {renderParticipant}
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography>Coach</Typography>
                            <div className={classes.itemWrapper}>
                                {renderCoach}
                            </div>
                        </Grid>
                    </Grid>
                    {/*Selection */}
                    {/*filter */}
                    <Grid item xs={3} spacing={3} className={classes.filter}>
                        <Typography variant={"h3"}>Filter</Typography>
                        <Grid item xs={12} >
                            <Typography>Service</Typography>
                            <div className={classes.itemWrapper}>
                                {renderService}
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography>Participant</Typography>
                            <div className={classes.itemWrapper}>
                                {renderParticipant}
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography>Coach</Typography>
                            <div className={classes.itemWrapper}>
                                {renderCoach}
                            </div>
                        </Grid>
                    </Grid>
                    {/*calendar */}
                    <Grid item xs={6} className={classes.calendar}  >
                        <BookingCalendar selected={selected} setSelected={setSelected} handleSelect={handleSelect} appointments={appointments} setAppointments={setAppointments} offerRequest={offerRequest} />
                    </Grid>
                    {/*SElections */}
                    <Grid item xs={3} spacing={3} className={classes.selection}>
                        <Grid item xs={12} >
                            <Typography variant={"h3"}>Selection</Typography>
                            <div className={classes.itemWrapper}>
                                {selected.length > 0 &&
                                    <Grid container spacing={3}>
                                        {selected.map(lesson => (
                                            <Grid item key={lesson.id} xs={12} >
                                                <SelectionCard data={lesson} handleRemove={handleRemove}></SelectionCard>
                                            </Grid>
                                        ))}
                                        <Grid container xs={6} >
                                            <Grid item xs={4} align="right">
                                                <IconButton
                                                    onClick={() => decreaseParticipantNumber()}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={4} align="center">
                                                <Typography
                                                    variant={"h4"}
                                                    color={"secondary"}
                                                >{numberParticipants}</Typography>
                                            </Grid>
                                            <Grid item xs={4} align="left">
                                                <IconButton
                                                    onClick={() => increasParticipantNumber()}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant={"body1"}>Participant(s)</Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant={"body1"}>Level:</Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant={"body1"}>Beginner</Typography>
                                        </Grid>
                                        <Grid item xs={6} align="left" >
                                            <Typography variant={"h6"}>Price: </Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography variant={"h6"}>375 CHF</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                color='primary'
                                                variant={"contained"}
                                                fullWidth
                                                onClick={() => setOpen(!open)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                                {/*Dialog box to open the participants form  */}
                                <Dialog open={open}>
                                    <DialogTitle id="form-dialog-title"> {current} / {numberParticipants} Participant Information</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            To subscribe to this website, please enter your email address here. We will send updates
                                            occasionally.
                                        </DialogContentText>
                                        <ParticipantForm setCurrent={setCurrent} participants={participants} setParticipants={setParticipants} numberParticipants={numberParticipants} ></ParticipantForm>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="primary" onClick={() => setOpen(!open)}>
                                            Cancel
                                        </Button>
                                        <Button color="Secondary" onClick={() => console.log("handle add participants")}>
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    )
}
