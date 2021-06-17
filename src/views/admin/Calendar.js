import React from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Toolbar,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Grid } from '@material-ui/core';

const currentDate = '2021-06-15';
const schedulerData = [
    {
        title: 'Private SKI lesson',
        startDate: new Date(2021, 5, 15, 9, 0),
        endDate: new Date(2021, 5, 15, 12, 0),
    },
    {
        title: 'Group SKI lesson',
        startDate: new Date(2021, 0, 15, 9, 0),
        endDate: new Date(2021, 0, 15, 12, 0),
    }
];

export default function Calendar() {
    console.log(schedulerData)
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Scheduler
                            data={schedulerData}
                        >
                            <ViewState
                                defaultCurrentDate={currentDate}
                                defaultCurrentViewName="Week"
                            />
                            <DayView
                                startDayHour={6}
                                endDayHour={16}
                            />
                            <WeekView
                                startDayHour={6}
                                endDayHour={19}
                            />
                            <Toolbar />
                            <ViewSwitcher />
                            <Appointments />
                            <AppointmentTooltip
                                showCloseButton
                                showOpenButton
                            />
                            <AppointmentForm
                                readOnly
                            />
                        </Scheduler>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
