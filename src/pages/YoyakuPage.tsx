// YoyakuPage.tsx
import React, { useEffect, useReducer } from 'react';
import { Grid, Typography } from '@mui/material';
import SimpleCalendar from '../components/calendarFeatures/SimpleCalendar';
import BuildingSelector from '../components/selectors/BuildingSelector';
import RoomSelector from '../components/selectors/RoomSelector';
import DateSelector from '../components/selectors/DateSelector';
import { State } from '../types/reservationState';
import { reducer } from '../reducers/reservationReducer';
import { rooms } from '../data/buildingData';
import { PayloadType } from '../types/reservationActions';
import { fetchReservations } from '../services/fetchReservations';

const YoyakuPage: React.FC = () => {
    const initialState: State = {
        selectedBuilding: '桜ヶ丘体育館',
        selectedRoom: '体育室A面',
        selectedDate: new Date(),
        calendarDate: new Date(),
        startTime: new Date(),
        selectedUsageTime: 1,
        reservations: [],
        errorMessage: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleStateChange = (action: PayloadType) => {
        dispatch(action);
    };

    useEffect(() => {
        const start = new Date(state.selectedDate || new Date());
        start.setHours(0, 0, 0, 0);
        const end = new Date(state.selectedDate || new Date());
        end.setHours(23, 59, 59, 999);

        fetchReservations(state.selectedRoom, start.toISOString(), end.toISOString())
            .then(reservations => {
                dispatch({ type: 'SET_RESERVATIONS', payload: reservations });
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    }, [state.selectedRoom, state.selectedDate]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>建物</Typography>
                {state.errorMessage && (
                    <Grid item xs={12}>
                        <Typography color="error">{state.errorMessage}</Typography>
                    </Grid>
                )}
            </Grid>
            <BuildingSelector
                selectedBuilding={state.selectedBuilding}
                onSelectBuilding={(building) => handleStateChange({ type: 'SET_BUILDING', payload: building })}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>部屋</Typography>
            </Grid>
            <RoomSelector
                selectedBuilding={state.selectedBuilding}
                selectedRoom={state.selectedRoom}
                onSelectRoom={(room) => handleStateChange({ type: 'SET_ROOM', payload: room })}
                rooms={rooms}
            />
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>日にち</Typography>
            </Grid>
            <Grid item xs={10}>
                <DateSelector
                    selectedDate={state.selectedDate}
                    onSelectDate={(date: Date | null) => handleStateChange({ type: 'SET_DATE', payload: date })}
                />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="subtitle1" style={{ textAlign: 'right' }}>予約状況</Typography>
            </Grid>
            <Grid item xs={10} container justifyContent="left">
                <Grid item xs={10}>
                    <SimpleCalendar
                        date={state.selectedDate ? new Date(state.selectedDate) : new Date()}
                        reservations={state.reservations}
                    />
                </Grid>
            </Grid>
        </Grid >
    );
};

export default YoyakuPage;
