import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    AllDayPanel,
    WeekView,
    Toolbar,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    MonthView,
    DragDropProvider,
    DateNavigator,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { Grid } from '@material-ui/core';
import request from '../../utils/request';

/*calendar component for the employees from => @devexpress library */
export default function Calendar({ isLoggedIn }) {
    const [data, setData] = useState([]);
    const [changedAppointment, setChangedAppointment] = useState();
    const [deletedAppointment, setDeletedAppointment] = useState();
    const [editingOptions, setEditingOptions] = useState({
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowDragging: true,
        allowResizing: true,
    });
    const [addedAppointment, setAddedAppointment] = useState();
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    //handle CRUD operations to the backend, on
    useEffect(() => {
        async function fetchMyAPI() {
            //get token
            let token = JSON.parse(localStorage.getItem("user")).token;

            if (addedAppointment) {
                console.log("new appointment")
                setAddedAppointment(null);
                let body = JSON.stringify(addedAppointment);

                //wait response, add to data
                //setData([...data, added]);
                let response = await request(
                    'https://localhost:5001/CalendarItem/',
                    "POST",
                    body, setApiErrorMessage, token);
                //console.log("response: ", response)
                //add the id 
                //filter out old object
                var temp = data.filter(appointment => appointment.id != -1)
                setData([...temp, response])
            }
            if (changedAppointment) {
                let body = JSON.stringify(changedAppointment);
                let response = await request(
                    'https://localhost:5001/CalendarItem/',
                    "PUT",
                    body, setApiErrorMessage, token);
                console.log("response: ", response)
                setChangedAppointment(null);
                //setData([...data, response])
            }
            if (deletedAppointment) {
                console.log("deleted appointnemt")
                console.log(JSON.stringify(deletedAppointment))

                let response = await request(
                    'https://localhost:5001/CalendarItem/' + deletedAppointment.id,
                    "DELETE", null, setApiErrorMessage, token);
                console.log("response: ", response)
                setDeletedAppointment(null);
            }
            if (data.length === 0) {
                console.log("Get Data")
                let response = await request(
                    'https://localhost:5001/CalendarItem/' + user.employeeId,
                    "GET", null, setApiErrorMessage, token);
                console.log("response: ", response)
                /*setData()*/
                if (response) {
                    setData(response);
                }
                setIsLoading(false)
            }

            setAddedAppointment(null);
            setChangedAppointment(null);
            setDeletedAppointment(null);
        }
        fetchMyAPI()
    }, [data])

    const {
        allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
    } = editingOptions;

        /*source: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/ */
    const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
        var user = JSON.parse(localStorage.getItem('user'))
        if (added) {
            setData([...data, { id: -1, ...added }]);
            setAddedAppointment({ id: -1, employeeId: user.employeeId, ...added })
        }
        if (changed) {

            let idE = 0;
            var appointmentOld = data.filter(appointment => {
                if (changed[appointment.id]) {
                    idE = appointment.id
                    return appointment.id;
                }
            })


            setChangedAppointment({ ...changed[idE], employeeId: user.employeeId, id: idE });

            setData(data.map(appointment => (
                changed[appointment.id] ?

                    {
                        ...appointment, ...changed[appointment.id], id: appointment.id

                    } : appointment)));
        }
        if (deleted !== undefined) {

            setDeletedAppointment({ id: deleted, employeeId: user.employeeId });
            setData(data.filter(appointment => appointment.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = React.useCallback((appointment) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    });
    const handleEditingOptionsChange = React.useCallback(({ target }) => {
        const { value } = target;
        const { [value]: checked } = editingOptions;
        setEditingOptions({
            ...editingOptions,
            [value]: !checked,
        });
    });

    /*source: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/ */
    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

        /*source: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/ */
    const CommandButton = React.useCallback(({ id, ...restProps }) => {

        if (id === 'deleteButton') {
            return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
        }
        return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }, [allowDeleting]);

    const allowDrag = React.useCallback(
        () => allowDragging && allowUpdating,
        [allowDragging, allowUpdating],
    );
    const allowResize = React.useCallback(
        () => allowResizing && allowUpdating,
        [allowResizing, allowUpdating],
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

                                defaultCurrentViewName="Day"
                            />
                            <EditingState
                                onCommitChanges={onCommitChanges}
                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={onAddedAppointmentChange}
                            />
                            <IntegratedEditing />
                            <DayView
                                startDayHour={6}
                                endDayHour={16}
                            />
                            <WeekView
                                startDayHour={6}
                                endDayHour={16}
                                timeTableCellComponent={TimeTableCell}
                            />
                            <MonthView
                                startDayHour={6}
                                endDayHour={16}
                            />

                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <ViewSwitcher />
                            <Appointments />
                            <AllDayPanel/>
                            <AppointmentTooltip
                                showCloseButton
                                showOpenButton
                                showDeleteButton
                            />
                            <AppointmentForm
                                commandButtonComponent={CommandButton}
                                readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                            />
                            <DragDropProvider
                                allowDrag={allowDrag}
                                allowResize={allowResize}
                            />
                        </Scheduler>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
