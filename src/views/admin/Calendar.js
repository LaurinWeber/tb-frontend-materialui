import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Toolbar,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    MonthView,
    DragDropProvider,
    ConfirmationDialog,
    DateNavigator,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { Grid } from '@material-ui/core';
import request from '../../utils/request';

const selectOptions = [
    {
        id: "1",
        text: 'Beginner',
    },
    {
        id: "2",
        text: 'Advanced',
    },
    {
        id: "3",
        text: 'Professional',
    }
];

const statusOptions = [
    {
        id: "1",
        text: 'Available',
    },
    {
        id: "2",
        text: 'Blocked',
    },
    {
        id: "3",
        text: 'Locked',
    },
    {
        id: "3",
        text: 'Booked',
    }
];

const schedulerData = [
    {
        id: "1",
        title: 'SKI - Private Lesson',
        startDate: new Date('2021-07-11 10:12:50'),
        endDate: new Date('2021-07-11 10:14:50'),
        notes: "Angela 12 and Marta 13 are Beginner at Arnouva",
        status: "1"
    },
    {
        id: "2",
        title: 'Group SKI lesson',
        startDate: new Date(2021, 0, 15, 9, 0),
        endDate: new Date(2021, 0, 15, 12, 0),
        isValidated: false,
        location: "Arnouva",
        level: {
            id: "1",
            text: "Beginner"
        },

        participants: 2,
        description: "Angela 12 and Marta 13"
    }
];


//Customize the Appointmentform
const messages = {
    moreInformationLabel: '',
};

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    /* if (props.type === 'titleTextEditor') {
         return null;
     }*/
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props} />;
};

const LabelEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    /* if (props.type === 'titleTextEditor') {
         return null;
     }*/
    if (props.type === 'title') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onDescriptionFieldChange = (nextValue) => {
        onFieldChange({ description: nextValue });
    };
    const onStatusChange = (nextValue) => {
        onFieldChange({ status: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            fullSize
            {...restProps}
        >
            <AppointmentForm.Select
                value={appointmentData.status}
                onValueChange={onStatusChange}
                availableOptions={statusOptions}
            />
            {/* 
            <AppointmentForm.Label
                text="Description"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.description}
                type={'multilineTextEditor'}
                onValueChange={onDescriptionFieldChange}
                placeholder="Description"
            />
            <Grid item xs={6}>
                <AppointmentForm.Label
                    text="Level"
                    type="title"
                />
                <AppointmentForm.Select
                    value={appointmentData.level}
                    onValueChange={onSelectFieldChange}
                    availableOptions={selectOptions}
                />
            </Grid>*/}
        </AppointmentForm.BasicLayout>
    );
};


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

    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

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

    /*
        console.log(schedulerData)
    
        const commitChanges = ({ added, changed, deleted }) => {
            this.setState((state) => {
                let { data } = state;
                if (added) {
                    const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                    data = [...data, { id: startingAddedId, ...added }];
                }
                if (changed) {
                    data = data.map(appointment => (
                        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
                }
                if (deleted !== undefined) {
                    data = data.filter(appointment => appointment.id !== deleted);
                }
                return { data };
            });
        }
    */
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
                            <AppointmentTooltip
                                showCloseButton
                                showOpenButton
                                showDeleteButton
                            />
                            <AppointmentForm
                                basicLayoutComponent={BasicLayout}
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
