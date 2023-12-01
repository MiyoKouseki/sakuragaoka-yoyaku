// YoyakuPage.tsx
import React, { useReducer, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchReservations } from '../services/fetchReservations';
import SimpleCalendar from '../components/calendarFeatures/SimpleCalendar';
import BuildingSelector from '../components/selectors/BuildingSelector';
import RoomSelector from '../components/selectors/RoomSelector';
import DateSelector from '../components/selectors/DateSelector';
import { State } from '../types/reservationState';
import { reducer } from '../reducers/reservationReducer';
import { generateDates, getNextHalfHourDate } from '../utils/dateUtils';
import { rooms } from '../data/buildingData';
import { getStartOfDay, getEndOfDay } from '../utils/dateUtils';
import { PayloadType } from '../types/reservationActions';
import useReservationData from '../hooks/useReservationData';

const dates = generateDates();

const YoyakuPage: React.FC = () => {
    const initialState: State = {
        selectedBuilding: '桜ヶ丘体育館',
        selectedRoom: '体育室A面',
        selectedDate: format(new Date(), 'yyyy-MM-dd', { locale: ja }),
        calendarDate: new Date(),
        startTime: getNextHalfHourDate(),
        selectedUsageTime: 1,
        reservations: [],
        errorMessage: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const startOfDay = useMemo(() => {
        return state.selectedDate ? getStartOfDay(state.selectedDate) : new Date();
    }, [state.selectedDate]);

    const endOfDay = useMemo(() => {
        return state.selectedDate ? getEndOfDay(state.selectedDate) : new Date();
    }, [state.selectedDate]);

    const { reservations, errorMessage } = useReservationData(state.selectedRoom, startOfDay, endOfDay);

    const handleStateChange = (action: PayloadType) => {
        dispatch(action);
    };

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
                    dates={dates}
                    selectedDate={state.selectedDate}
                    onSelectDate={(date) => handleStateChange({ type: 'SET_DATE', payload: date })}
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
