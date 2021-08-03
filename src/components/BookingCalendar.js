import React, { useState, useEffect } from 'react'
import { Grid, Paper, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
    Scheduler,
    Toolbar,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    MonthView,
    WeekView,
    DayView,
    DateNavigator,
    TodayButton,
    AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';

/** Test data */
const INTIAL = [
    {
        id: "1",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 09:00:00'),
        endDate: new Date('2021-07-11 16:00:00'),
        allDay: true,
    },
    {
        id: "2",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 09:00:00'),
        endDate: new Date('2021-07-11 12:00:00'),
    },
    {
        id: "3",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 13:00:00'),
        endDate: new Date('2021-07-11 16:00:00'),
    },
    {
        id: "4",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 09:00:00'),
        endDate: new Date('2021-07-11 11:00:00'),
    }, {
        id: "5",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 11:00:00'),
        endDate: new Date('2021-07-11 13:00:00'),
    }, {
        id: "6",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 13:00:00'),
        endDate: new Date('2021-07-11 15:00:00'),
    }, {
        id: "7",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 10:00:00'),
        endDate: new Date('2021-07-11 12:00:00'),
    }, {
        id: "8",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 12:00:00'),
        endDate: new Date('2021-07-11 14:00:00'),
    }, {
        id: "9",
        title: 'Private Lesson',
        startDate: new Date('2021-07-11 14:00:00'),
        endDate: new Date('2021-07-11 16:00:00'),
    },

]

const CommandButton = (props) => {
    return <AppointmentTooltip.CommandButton {...props} />
};

/* Booking calendar components */
export default function BookingCalendar({ selected, setSelected, offerRequest }) {
    const [data, setData] = useState(INTIAL);
    

    /* header of the popup from calendar appointment */
    const Header = ({
        children, appointmentData, classes, ...restProps
    }) => (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
        >
{/* create custom button */}
            <IconButton
                onClick={() => setSelected([...selected, appointmentData])}
            >
                Add
                <MoreIcon />
            </IconButton>
        </AppointmentTooltip.Header>
    );
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Scheduler
                            data={data}

                        >
                            <ViewState
                                defaultCurrentViewName={"Week"}
                            />
                            <WeekView
                                startDayHour={9}
                                endDayHour={16}
                            />
                            <MonthView
                                startDayHour={9}
                                endDayHour={16}
                            />
                            <DayView
                                startDayHour={9}
                                endDayHour={16}
                            />

                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <ViewSwitcher />
                            <Appointments />
                            <AllDayPanel />
                            <AppointmentTooltip
                                headerComponent={Header}
                                commandButtonComponent={CommandButton}
                                showCloseButton
                            />
                        </Scheduler>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
